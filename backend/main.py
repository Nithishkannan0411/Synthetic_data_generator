from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model.generator_engine import generate_dataset
import os

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("output", exist_ok=True)

@app.get("/")
def home():
    return {"message": "Synthetic Data Generator API Running"}

@app.get("/generate")
def generate(schema: str, rows: int = 100):

    schema_list = schema.split(",")

    df = generate_dataset(schema_list, rows)

    file_path = "output/generated_data.csv"

    df.to_csv(file_path, index=False)

    return {
        "message": "Dataset generated successfully",
        "data": df.to_dict(orient="records")
    }