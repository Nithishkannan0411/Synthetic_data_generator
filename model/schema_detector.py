import re

def detect_column_type(column_name):

    column_name = column_name.lower()

    if "name" in column_name:
        return "name"

    elif "email" in column_name:
        return "email"

    elif "phone" in column_name or "mobile" in column_name:
        return "phone"

    elif "city" in column_name:
        return "city"

    elif "country" in column_name:
        return "country"

    elif "job" in column_name or "profession" in column_name:
        return "job"

    elif "salary" in column_name or "income" in column_name:
        return "numeric"

    elif "age" in column_name:
        return "numeric"

    elif "date" in column_name:
        return "date"

    else:
        return "text"