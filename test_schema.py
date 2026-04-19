from model.schema_detector import detect_column_type

schema = ["Name","Age","Email","Phone","City","Salary"]

for column in schema:
    print(column,"->",detect_column_type(column))