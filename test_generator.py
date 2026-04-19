from model.generator_engine import generate_dataset

schema = ["Name","Age","Email","Phone","City","Salary"]

df = generate_dataset(schema,100)

print(df.head())

df.to_csv("output/synthetic_data.csv",index=False)

print("Dataset generated successfully!")