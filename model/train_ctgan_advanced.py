import pandas as pd
from sdv.single_table import CTGANSynthesizer
from sdv.metadata import SingleTableMetadata

# ================= LOAD DATA =================

files = [
    "data/Student_Performance_Data.csv",
    "data/Employee_Information.csv",
    "data/Department_Information.csv"
]

df_list = []

for file in files:
    try:
        df = pd.read_csv(file)
        df_list.append(df)
        print(f"Loaded: {file}")
    except Exception as e:
        print(f"Skipped {file}: {e}")

# ================= MERGE =================

df = pd.concat(df_list, ignore_index=True)

# ================= CLEAN =================

df = df.drop_duplicates()

# forward fill (NEW way, no warning)
df = df.ffill()

# normalize column names
df.columns = df.columns.str.lower().str.strip()

# 🔥 PRINT BEFORE DROP (IMPORTANT DEBUG)
print("\nColumns BEFORE cleaning:", df.columns)

# ================= DROP BAD COLUMNS =================

# drop any column containing these keywords
drop_keywords = ["id", "dob", "doj", "doe"]

cols_to_drop = []

for col in df.columns:
    for keyword in drop_keywords:
        if keyword in col:
            cols_to_drop.append(col)

df = df.drop(columns=cols_to_drop)

# ================= FINAL CLEAN =================

df = df.dropna()

# convert numeric safely
if "marks" in df.columns:
    df["marks"] = pd.to_numeric(df["marks"], errors="coerce")

df = df.dropna()

print("\nColumns AFTER cleaning:", df.columns)
print("Dataset shape:", df.shape)

# ================= METADATA =================

metadata = SingleTableMetadata()
metadata.detect_from_dataframe(df)

# ================= TRAIN =================

model = CTGANSynthesizer(
    metadata,
    epochs=100   # reduced for faster training (safe for now)
)

print("\nTraining CTGAN model...")
model.fit(df)

# ================= SAVE =================

model.save("model/ctgan_advanced.pkl")

print("\n✅ Model trained successfully!")