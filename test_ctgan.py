import pandas as pd
from sdv.single_table import CTGANSynthesizer
from sdv.metadata import SingleTableMetadata

# Load dataset
data = pd.read_csv("data/faker.csv")

# Create metadata
metadata = SingleTableMetadata()
metadata.detect_from_dataframe(data)

# Create CTGAN model
model = CTGANSynthesizer(metadata)

# Train model
model.fit(data)

# Generate synthetic rows
synthetic_data = model.sample(num_rows=100)

print(synthetic_data)

# Save output
synthetic_data.to_csv("synthetic_output.csv", index=False)

print("Synthetic data generated successfully!")