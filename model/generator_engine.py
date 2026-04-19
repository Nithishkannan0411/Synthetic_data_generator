import pandas as pd
from faker import Faker
from sdv.single_table import CTGANSynthesizer

fake = Faker()

# Try loading model (optional)
try:
    model = CTGANSynthesizer.load("model/ctgan_advanced.pkl")
except:
    model = None

def generate_dataset(schema, rows):

    data = {}

    # Try CTGAN if available
    synthetic = None
    if model:
        try:
            synthetic = model.sample(rows)
        except:
            synthetic = None

    for col in schema:
        col_lower = col.lower().strip()

        # ✅ Use CTGAN only if meaningful
        if synthetic is not None and col_lower in synthetic.columns:
            data[col] = synthetic[col_lower].tolist()

        # ✅ Faker-based generation (MAIN ENGINE)
        elif "name" in col_lower:
            data[col] = [fake.name() for _ in range(rows)]

        elif "email" in col_lower:
            data[col] = [fake.email() for _ in range(rows)]

        elif "phone" in col_lower:
            data[col] = [fake.phone_number() for _ in range(rows)]

        elif "city" in col_lower:
            data[col] = [fake.city() for _ in range(rows)]

        elif "age" in col_lower:
            data[col] = [fake.random_int(min=18, max=60) for _ in range(rows)]

        elif "salary" in col_lower:
            data[col] = [fake.random_int(min=20000, max=100000) for _ in range(rows)]

        else:
            # fallback
            data[col] = [fake.word() for _ in range(rows)]

    return pd.DataFrame(data)