from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
import logging
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
import mysql.connector
from datetime import datetime

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
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading .env file (ensure that this relative path is correct)
load_dotenv(dotenv_path='../../../Constant/Database-Credentials/.env')

# Database Connection configuration
db_config = {
    "host": os.getenv('DB_HOST'),     # e.g., "127.0.0.1" or your online DB host
    "user": os.getenv('DB_USER'),
    "password": os.getenv('DB_PASSWORD'),
    "database": os.getenv('DB_NAME'),
}

# Define the data model for OAuth user registration
class UserInfo(BaseModel):
    name: Optional[str] = "Not Provided"
    givenName: Optional[str] = "Not Provided"
    nickName: Optional[str] = "Not Provided"
    familyName: Optional[str] = "Not Provided"
    email: Optional[str] = "Not Provided"
    isEmailVerified: Optional[str] = "Not Provided"
    sub: Optional[str] = "Not Provided"
    picture: Optional[str] = "Not Provided"
    updatedAt: Optional[str] = "Not Provided"
    registration_date: Optional[str] = Field(default_factory=lambda: datetime.now().strftime('%Y-%m-%d'))
    registration_time: Optional[str] = Field(default_factory=lambda: datetime.now().strftime('%H:%M:%S'))

# Optional: Separate Pydantic model for request validation if needed
class UserOAuthRegisterRequest(BaseModel):
    name: str
    givenName: str
    nickName: str
    familyName: str
    email: str
    isEmailVerified: str
    sub: str
    picture: str
    updatedAt: str

def user_exists(user_info: UserInfo) -> bool:
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        # Assume 'sub' is unique for each OAuth user
        query = "select count(*) from oauth_registered_user where sub = %s"
        cursor.execute(query, (user_info.sub,))
        count = cursor.fetchone()[0]
        cursor.close()
        connection.close()
        return count > 0
    except Exception as e:
        print(f"Error checking for existing user: {e}")
        return False
    
# Function to insert OAuth-registered user data into MySQL.
# This function assumes your table 'oauth_user_registered'
# has columns: name, givenname, nickname, familyname, email, isemailverified,
# sub, picture, updatedat, registration_date, registration_time.
def insert_into_db(user_info: UserInfo):
    try:
        if user_exists(user_info):
            print("User already registered. Skipping insert or updating record.")
            # Option 1: Return False or a specific message that user exists
            # return False
            # Option 2: Update the existing record. (You can write an UPDATE query here)
            return 1
        
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        insert_query = """
        insert into oauth_registered_user (
            name, givenname, nickname, familyname, email, isemailverified,
            sub, picture, updatedat, registration_date, registration_time
        ) values (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        )
        """

        cursor.execute(insert_query, (
            user_info.name,
            user_info.givenName,
            user_info.nickName,
            user_info.familyName,
            user_info.email,
            user_info.isEmailVerified,
            user_info.sub,
            user_info.picture,
            user_info.updatedAt,
            user_info.registration_date,
            user_info.registration_time
        ))
        connection.commit()
        cursor.close()
        connection.close()
        return 0
    except Exception as e:
        print(f"Error inserting data: {e}")
        return 2

# Endpoint to register the OAuth-verified user into the database.
@app.post("/register-oauth-user")
async def register_oauth_user(user_info: UserInfo):
    success = insert_into_db(user_info)
    if success==0:
        return {"message": "OAuth User Data inserted successfully"}
    if success==1:
        return {"message": "OAuth Data Not Inserted; User Already Exists"}
    else:
        raise HTTPException(status_code=500, detail="Failed to insert data")

# Run the FastAPI app using uvicorn.
import uvicorn
import os
if __name__ == "__main__":
    uvicorn.run("signUpOAuth:app", host="0.0.0.0", port=8002, reload=True, reload_dirs=[os.path.join(os.path.dirname(os.path.abspath(__file__)), "../OAuth-User-Verified-Registration")])


# Path : src\Backend\Application-Programming-Interfaces\OTP-Verification
# Execution Command : uvicorn signUpOAuth:app --host 0.0.0.0 --port 8000 --reload

# Path : src\Backend\Application-Programming-Interfaces\OAuth-User-Verified-Registration