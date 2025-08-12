import argparse
from graph import graph

def main():
    parser = argparse.ArgumentParser(description="RAG Chatbot với SQLite + Claude via LangGraph")
    parser.add_argument("--question", type=str, required=True, help="Câu hỏi truy vấn phòng trọ")
    args = parser.parse_args()
    state = {"question": args.question}
    result = graph.invoke(state)
    print("Answer:", result.get("answer"))

if __name__ == "__main__":
    main()