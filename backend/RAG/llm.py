from decouple import config
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq 
def get_llm(): 
    gemini_15 = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0,
        google_api_key=config("GOOGLE_API_KEY")
    )
    return gemini_15

# def get_llm():
#     llm = ChatGroq(
#         model="qwen-qwq-32b",
#         api_key=config("GROQ_API_KEY"),   
#         streaming=True,  
#         temperature=0.0,
#     )
#     return llm
