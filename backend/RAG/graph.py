from langgraph.graph import StateGraph, END
from agent_tools import get_tools

 # Định nghĩa trạng thái chat
class ChatState(dict):
     pass


 # Load công cụ
TOOLS = get_tools()


# Node: Nhập câu hỏi từ user
def user_input_node(state: ChatState):
     return {"question": state["question"]}

# Node: Truy vấn SQL
def retrieve_node(state: ChatState):
    query = state["question"]
    result = TOOLS[0].run(query)
    return {"retrieved": result}

# Node: Sinh câu trả lời
def generate_node(state: ChatState):
    return {"answer": state["retrieved"]}


# Xây dựng graph
builder = StateGraph(ChatState)
builder.add_node("input", user_input_node)
builder.add_node("retrieve", retrieve_node)
builder.add_node("generate", generate_node)
builder.set_entry_point("input")
builder.add_edge("input", "retrieve")
builder.add_edge("retrieve", "generate")
builder.add_edge("generate", END)
graph = builder.compile()