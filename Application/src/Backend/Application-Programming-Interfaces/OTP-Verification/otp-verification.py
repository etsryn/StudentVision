# sender_password = "vczh tijn svvm jdey"
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
import random
import logging
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware

# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Create FastAPI app
app = FastAPI()
# Add CORS middleware to allow requests from any origin (or specify allowed origins)
origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:5174",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins, change to a list of trusted origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods, you can restrict to ["GET", "POST"]
    allow_headers=["*"],  # Allows all headers
)

# Pydantic model for request validation
class OTPRequest(BaseModel):
    email: str
    firstName: str

# Pydantic model for verifying OTP (requires email and otp)
class OTPVerificationRequest(BaseModel):
    email: str
    otp: int

# Function to generate OTP and send it via email
@app.post("/send-otp")
async def send_otp(request: OTPRequest):
    global OTP  # Declare OTP as global so we update the global variable
    try:
        # Log incoming request data for debugging
        logging.debug(f"Received OTP request for email: {request.email}")

        # Generate a 6-digit OTP
        otp = random.randint(100000, 999999)
        OTP = otp
        logging.debug(f"Generated OTP: {otp}")

        # Setup email parameters
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = "sv.studentvision@gmail.com"
        sender_password = "vczh tijn svvm jdey"

        # Generate the email body with a full message
        msg_body = f"""
        <html>
          <body>
            <p>Dear <b>{request.firstName}</b>,</p>
        
            <p>Thank you for choosing <strong>StudentVision</strong>.</p>
        
            StudentVision is an AI-powered platform that supports learning in Data Science, AI, ML, and beyond. It offers personalized study insights, a research hub, and live coding environments. With integrations like Google Colab, Modelverse, and Dataverse, StudentVision ensures a smarter, more efficient learning journey.
        
            <p><strong>Your One Time Password is: <span style="color:blue; font-size:16px;">{otp}</span></strong></p>
            <p><i>(Do not share it with anyone. This OTP is valid only for a short period.)</i></p>
        
            <p>If you did not request this OTP, please disregard this email.</p>
        
            <br>
            <p>Best regards,</p>
            <p><strong>Rayyan Ashraf</strong><br>
            Developer, StudentVision<br>
            LinkedIn: <a href="https://www.linkedin.com/in/rayyan-ashraf/">https://www.linkedin.com/in/rayyan-ashraf/</a></p>
          </body>
        </html>
        """
        
        # Compose the email
        msg = MIMEText(msg_body, "html")
        msg['Subject'] = 'Your OTP Code'
        msg['From'] = sender_email
        msg['To'] = request.email
        

        # Log email details
        logging.debug(f"Sending OTP to {request.email}")

        # Send the email using SMTP
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()  # Secure the connection
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, request.email, msg.as_string())
        
        # Log success message
        logging.debug(f"OTP successfully sent to {request.email}")

        # Return success response
        return {"message": "OTP sent successfully to the provided email address."}
    
    except smtplib.SMTPException as e:
        logging.error(f"SMTP error: {e}")
        raise HTTPException(status_code=500, detail="SMTP error occurred while sending the email.")
    
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error occurred.")
    
@app.post("/verify-otp")
async def verify_otp(request: OTPVerificationRequest):
    global OTP  # Access the global OTP variable
    if request.otp == OTP:
        return {"success": True, "message": "OTP verified successfully"}
    else:
        # raise HTTPException(status_code=400, detail="Invalid OTP")
        return {"failure": True, "message": "OTP verification failed"}


import uvicorn
import os
if __name__ == "__main__":
    uvicorn.run("otp-verification:app", host="0.0.0.0", port=8001, reload=True, reload_dirs=[os.path.join(os.path.dirname(os.path.abspath(__file__)), "../OTP-Verification")])


# Path : src\Backend\Application-Programming-Interfaces\OTP-Verification
# Execution Command : uvicorn otp-verification:app --host 0.0.0.0 --port 8000 --reload