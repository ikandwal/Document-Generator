from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Ensure outputs directory exists
os.makedirs("outputs", exist_ok=True)

# Initialize FastAPI app
app = FastAPI(
    title="Smart Documentation Automation Platform",
    description="API for parsing, AI-processing, and generating formatted documentation.",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from routers import generate
app.include_router(generate.router)

@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "ok"}
