import mysql.connector
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import os

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
load_dotenv(dotenv_path='../Constant/Database-Credentials/.env')

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
            mediaDevices, fonts, webGLRenderer, touchSupport, userAgent
        ) values (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        )
        """

        cursor.execute(insert_query, (
            user_info.ip, user_info.location, user_info.timezone, user_info.browser, user_info.os,
            user_info.screenSize, user_info.geolocation, user_info.deviceType, user_info.connectionType,
            user_info.referrer, user_info.language, user_info.timeFormat, user_info.adBlocker,
            user_info.cpuInfo, user_info.gpuInfo, user_info.battery, user_info.ram, user_info.storage,
            user_info.audioDevices, user_info.mediaDevices, user_info.fonts, user_info.webGLRenderer,
            user_info.touchSupport, user_info.userAgent
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)








































# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from typing import Optional

# app = FastAPI()

# # Enable CORS for your React app (adjust origin as needed)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # React development server address
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class UserInfo(BaseModel):
#     ip: Optional[str] = "Not Provided"
#     location: Optional[str] = "Not Provided"
#     timezone: Optional[str] = "Not Provided"
#     browser: Optional[str] = "Not Provided"
#     os: Optional[str] = "Not Provided"
#     screenSize: Optional[str] = "Not Provided"
#     geolocation: Optional[str] = "Not Provided"
#     deviceType: Optional[str] = "Not Provided"
#     connectionType: Optional[str] = "Not Provided"
#     referrer: Optional[str] = "Not Provided"
#     language: Optional[str] = "Not Provided"
#     timeFormat: Optional[str] = "Not Provided"
#     adBlocker: Optional[str] = "Not Provided"
#     cpuInfo: Optional[str] = "Not Provided"
#     gpuInfo: Optional[str] = "Not Provided"
#     battery: Optional[str] = "Not Provided"
#     ram: Optional[str] = "Not Provided"
#     storage: Optional[str] = "Not Provided"
#     audioDevices: Optional[str] = "Not Provided"
#     mediaDevices: Optional[str] = "Not Provided"
#     fonts: Optional[str] = "Not Provided"
#     webGLRenderer: Optional[str] = "Not Provided"
#     touchSupport: Optional[str] = "Not Provided"
#     userAgent: Optional[str] = "Not Provided"

# @app.post("/submit-data")
# async def submit_data(user_info: UserInfo):
#     # For debugging, print the received payload
#     print("Received data:")
#     print(user_info.model_dump())
#     return {"message": "Data received successfully", "data": user_info.model_dump()}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
