from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL', 'notificaciones@diazyciaabogados.cl')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class ContactResponse(BaseModel):
    status: str
    message: str
    contact_id: Optional[str] = None

# Routes
@api_router.get("/")
async def root():
    return {"message": "Díaz & Cía Abogados API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(form: ContactForm):
    """
    Receive contact form submission and send email notification
    """
    try:
        # Generate contact ID
        contact_id = str(uuid.uuid4())
        
        # Save to database
        contact_doc = {
            "id": contact_id,
            "name": form.name,
            "email": form.email,
            "phone": form.phone,
            "message": form.message,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "new"
        }
        await db.contacts.insert_one(contact_doc)
        logger.info(f"Contact saved to database: {contact_id}")
        
        # Send email notification
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #1A3C34; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Díaz & Cía Abogados</h1>
                <p style="color: #C25E00; margin: 5px 0 0 0; font-size: 14px;">Nuevo Contacto desde la Web</p>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0;">
                <h2 style="color: #1A3C34; margin-top: 0; font-size: 18px;">Datos del Contacto</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 120px; color: #1A3C34;">Nombre:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">{form.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #1A3C34;">Email:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:{form.email}" style="color: #C25E00;">{form.email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #1A3C34;">Teléfono:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><a href="tel:{form.phone}" style="color: #C25E00;">{form.phone}</a></td>
                    </tr>
                </table>
                
                <h3 style="color: #1A3C34; margin-top: 20px; font-size: 16px;">Mensaje:</h3>
                <div style="background-color: white; padding: 15px; border: 1px solid #e0e0e0; border-radius: 4px;">
                    <p style="margin: 0; white-space: pre-wrap;">{form.message}</p>
                </div>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
                <p style="margin: 0;">Este mensaje fue enviado desde el formulario de contacto de diazcia.cl</p>
                <p style="margin: 5px 0 0 0;">ID de contacto: {contact_id}</p>
            </div>
        </body>
        </html>
        """
        
        params = {
            "from": "Díaz & Cía Web <onboarding@resend.dev>",
            "to": [CONTACT_EMAIL],
            "subject": f"Nuevo Contacto Web: {form.name}",
            "html": html_content,
            "reply_to": form.email
        }
        
        # Try to send email (will work once domain is verified in Resend)
        try:
            email_result = await asyncio.to_thread(resend.Emails.send, params)
            logger.info(f"Email sent successfully: {email_result.get('id', 'unknown')}")
        except Exception as email_error:
            # Email failed but contact is saved - log and continue
            # TODO: Once domain diazyciaabogados.cl is verified in Resend, emails will work
            logger.warning(f"Email not sent (domain not verified yet): {str(email_error)}")
        
        return ContactResponse(
            status="success",
            message="Mensaje enviado correctamente. Nos contactaremos pronto.",
            contact_id=contact_id
        )
        
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error al procesar el formulario: {str(e)}")

@api_router.get("/contacts", response_model=List[dict])
async def get_contacts():
    """Get all contacts (admin endpoint)"""
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
