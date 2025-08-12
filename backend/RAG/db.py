from langchain_community.utilities import SQLDatabase
import os
from decouple import config  


def get_database():
    env_path = config("DB_PATH", default=None)
    uri = f"sqlite:///{env_path}"
    return SQLDatabase.from_uri(uri)
