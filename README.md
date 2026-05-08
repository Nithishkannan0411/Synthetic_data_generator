````markdown
# AI Synthetic Data Generator

AI Synthetic Data Generator is an intelligent and flexible system designed to generate realistic synthetic datasets based on user-defined schemas. It combines rule-based generation using Faker with AI-based synthetic data generation using CTGAN to create structured datasets for machine learning, software testing, and research purposes.

## Team Members
- **43611094 - Nithish K**
- **43611089 - Mohamed Rishan**

## GitHub Repository
https://github.com/Nithishkannan0411/Synthetic_data_generator

---

## Project Overview

Real-world data is often difficult to access due to privacy concerns, security restrictions, or limited availability. This project solves that problem by generating synthetic datasets that mimic realistic structured data without exposing sensitive information.

The system accepts a user-defined schema, detects column types, and generates matching synthetic data dynamically.

### Example Input

```text
Name, Age, Email, City, Salary
````

### Example Output

| Name        | Age | Email                                     | City    | Salary |
| ----------- | --- | ----------------------------------------- | ------- | ------ |
| John Smith  | 28  | [john@gmail.com](mailto:john@gmail.com)   | Chennai | 45000  |
| Priya Kumar | 32  | [priya@yahoo.com](mailto:priya@yahoo.com) | Mumbai  | 52000  |

---

## Features

* Dynamic schema-based dataset generation
* AI-powered synthetic data generation using CTGAN
* Rule-based fallback generation using Faker
* Automatic schema detection
* CSV dataset export
* FastAPI backend API
* Modern React frontend
* User-friendly interface

---

## Technologies Used

### Frontend

* React.js
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui

### Backend

* FastAPI
* Python

### AI / Data Libraries

* CTGAN
* SDV
* Faker
* Pandas
* NumPy
* Scikit-learn

---

## Project Architecture

```text
User Input Schema
       ↓
Schema Detection Engine
       ↓
Hybrid Data Generator
   ↙           ↘
Faker         CTGAN
   ↓             ↓
Synthetic Dataset Generation
       ↓
CSV Export
```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/Nithishkannan0411/Synthetic_data_generator.git
cd Synthetic_data_generator
```

---

### 2. Backend Setup

Install dependencies:

```bash
pip install fastapi uvicorn faker pandas sdv scikit-learn numpy
```

Run backend:

```bash
uvicorn backend.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

### 3. Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## API Endpoint

Generate dataset:

```http
GET /generate?schema=Name,Age,Email&rows=100
```

Example:

```http
http://127.0.0.1:8000/generate?schema=Name,Age,Email&rows=50
```

---

## Folder Structure

```text
synthetic-data-generator/
│
├── backend/
│   └── main.py
│
├── model/
│   ├── generator_engine.py
│   ├── schema_detector.py
│   └── train_ctgan_advanced.py
│
├── data/
│   ├── Employee_Information.csv
│   ├── Student_Performance_Data.csv
│   └── Department_Information.csv
│
├── frontend/
│
├── output/
│
└── README.md
```

---

## Use Cases

* Machine Learning dataset generation
* Software testing
* Privacy-preserving synthetic data creation
* Research experiments
* Educational projects

---

## Future Enhancements

* Data visualization dashboard
* Support for multiple export formats
* Domain-specific model training
* Better schema intelligence
* Cloud deployment

---

## Conclusion

AI Synthetic Data Generator provides a scalable and privacy-friendly solution for generating synthetic structured datasets dynamically. The hybrid AI + rule-based approach ensures both flexibility and realistic output generation.

---

## License

Educational Project

```
```
