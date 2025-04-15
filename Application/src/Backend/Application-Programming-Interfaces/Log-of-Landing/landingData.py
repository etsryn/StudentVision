import mysql.connector
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from dotenv import load_dotenv
import os
from datetime import datetime

app = FastAPI()

# Enable CORS for your React app (adjust origin as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React development server address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Loading .env file
load_dotenv(dotenv_path='../../../Constant/Database-Credentials/.env')

# Database Connection
db_config = {
    "host": os.getenv('DB_HOST'),  # Change if necessary
    "user": os.getenv('DB_USER'),
    "password": os.getenv('DB_PASSWORD'),
    "database": os.getenv('DB_NAME'),
}

# Define the data model
class UserInfo(BaseModel):
    ip: Optional[str] = "Not Provided"
    location: Optional[str] = "Not Provided"
    timezone: Optional[str] = "Not Provided"
    browser: Optional[str] = "Not Provided"
    os: Optional[str] = "Not Provided"
    screenSize: Optional[str] = "Not Provided"
    geolocation: Optional[str] = "Not Provided"
    deviceType: Optional[str] = "Not Provided"
    connectionType: Optional[str] = "Not Provided"
    referrer: Optional[str] = "Not Provided"
    language: Optional[str] = "Not Provided"
    timeFormat: Optional[str] = "Not Provided"
    adBlocker: Optional[str] = "Not Provided"
    cpuInfo: Optional[str] = "Not Provided"
    gpuInfo: Optional[str] = "Not Provided"
    battery: Optional[str] = "Not Provided"
    ram: Optional[str] = "Not Provided"
    storage: Optional[str] = "Not Provided"
    audioDevices: Optional[str] = "Not Provided"
    mediaDevices: Optional[str] = "Not Provided"
    fonts: Optional[str] = "Not Provided"
    webGLRenderer: Optional[str] = "Not Provided"
    touchSupport: Optional[str] = "Not Provided"
    userAgent: Optional[str] = "Not Provided"
    log_date: Optional[str] = Field(default_factory=lambda: datetime.now().strftime('%Y-%m-%d'))
    log_time: Optional[str] = Field(default_factory=lambda: datetime.now().strftime('%H:%M:%S'))

# Function to insert data into MySQL
def insert_into_db(user_info: UserInfo):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
 
        insert_query = """
        insert into landing_data_logs (
            ip, location, timezone, browser, os, screenSize, geolocation,
            deviceType, connectionType, referrer, language, timeFormat,
            adBlocker, cpuInfo, gpuInfo, battery, ram, storage, audioDevices,
            mediaDevices, fonts, webGLRenderer, touchSupport, userAgent, log_date, log_time
        ) values (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        )
        """

        cursor.execute(insert_query, (
            user_info.ip, user_info.location, user_info.timezone, user_info.browser, user_info.os,
            user_info.screenSize, user_info.geolocation, user_info.deviceType, user_info.connectionType,
            user_info.referrer, user_info.language, user_info.timeFormat, user_info.adBlocker,
            user_info.cpuInfo, user_info.gpuInfo, user_info.battery, user_info.ram, user_info.storage,
            user_info.audioDevices, user_info.mediaDevices, user_info.fonts, user_info.webGLRenderer,
            user_info.touchSupport, user_info.userAgent, user_info.log_date, user_info.log_time
        ))

        connection.commit()
        cursor.close()
        connection.close()
        return True
    except Exception as e:
        print(f"Error inserting data: {e}")
        return False

@app.post("/user-log")
async def submit_data(user_info: UserInfo):
    success = insert_into_db(user_info)
    if success:
        return {"message": "Data inserted successfully"}
    else:
        return {"error": "Failed to insert data"}


import uvicorn
if __name__ == "__main__":
    uvicorn.run("landingData:app", host="0.0.0.0", port=8000, reload=True, reload_dirs=[os.path.join(os.path.dirname(os.path.abspath(__file__)), "../Log-of-Landing")])

# Same Port is for otp-verfication.py
# Path : src\Backend\Application-Programming-Interfaces\Log-of-Landing
# Execution Command : uvicorn landingData:app --host 0.0.0.0 --port 8000 --reload