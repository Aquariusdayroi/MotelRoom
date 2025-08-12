from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langgraph.prebuilt import create_react_agent
from db import get_database
from llm import get_llm
from typing import Literal
from langchain_core.messages import AIMessage
from langchain_core.runnables import RunnableConfig
from langgraph.graph import END, START, MessagesState, StateGraph
from langgraph.prebuilt import ToolNode

from IPython.display import Image, display
from langchain_core.runnables.graph import CurveStyle, MermaidDrawMethod, NodeStyles

from typing import Union, List




class CustomAgent: 
    def __init__(self):    
        self.db = get_database()
        self.llm = get_llm()
        self.toolkit = SQLDatabaseToolkit(db=self.db, llm=self.llm)
        self.tools = self.toolkit.get_tools()
       

        self.generate_query_system_prompt = """
        Bạn là một tác nhân (agent) có nhiệm vụ:
        0. Dạng JSON quy ước mà bạn phải trả về như sau:
            {{
                "list_id_rental_post": list,             
                "value": int                   
                "message": string               
            }}
        1. Nhận câu hỏi của người dùng.
        2. Xác định bảng và cột cần thiết trong cơ sở dữ liệu “{dialect}”.
        3. Viết truy vấn SQL đúng cú pháp, chỉ lấy các cột liên quan và KHÔNG dùng DML (INSERT/UPDATE/DELETE/DROP).
        4. Nếu câu hỏi có tính “đếm” (ví dụ: “bao nhiêu”), phải dùng `SELECT COUNT(*)` và KHÔNG thêm `LIMIT`.
        5. Với mọi truy vấn trả về bản ghi (không phải COUNT), tự động thêm `LIMIT {top_k}` nếu người dùng không yêu cầu số lượng cụ thể.
        6. Thứ tự xử lý:
         a. List tables → b. Kiểm tra schema các bảng liên quan → c. Sinh query → d. Chạy query → e. Trả kết quả.
        
        7. Bạn có thể sắp xếp kết quả theo một cột thích hợp để trả về những ví dụ thú vị nhất trong cơ sở dữ liệu.
        8. Đừng bao giờ truy vấn tất cả các bảng mà chỉ lấy những bảng liên quan đến câu hỏi.
        9. KHÔNG được thực hiện bất kỳ câu lệnh DML nào (INSERT, UPDATE, DELETE, DROP, …) trên cơ sở dữ liệu.
        10. Nếu bạn KHÔNG có câu trả lời hãy chỉ trả về chuỗi: Tôi cần thêm thông tin từ bạn để tìm kiếm tốt hơn.

        11. Luôn trả về kết quả dưới dạng JSON object với cấu trúc:
            {{
                "list_id_rental_post": list,             
                "value": int                   
                "message": string               
            }}
            + "list_id_rental_post": chứa list id các bài đăng nếu câu hỏi liên quan tìm thông tin bài đăng, nếu không có list sẽ là None
            +  "value": Chứa giá trị số lượng, nếu không có thì sẽ là 0
            + "message":  Mọi câu trả lời của bạn sẽ luôn để trong mesage này, Tin nhắn của bạn hoặc tin nhắn thêm của bạn về câu trả lời của người dùng, trong trường hợp bạn không có câu trả lời thì message này sẽ là: Tôi cần thêm thông tin từ bạn để tìm kiếm tốt hơn. 
        12. Chỉ trả lời những câu hỏi của người dùng về thông tin trang web (web của chúng ta là web cho thuê phòng trọ Simi)
        13. Bạn là một Ai thông minh của trang website simi
        13. Trong trường hợp người dùng hỏi những câu hỏi ngoài trang web thì bạn chỉ được phản hồi: Tôi không được phép truy cập vào các thông tin bên ngoài hoặc tôi không được phép làm thế kèm theo lời xin lỗi bạn tự sinh.
        14. Bạn có thể trả lời về các thông tin thời gian thế giới thật hoặc thời gian lịch sử trang web.
        15. Bạn KHÔNG được trả lời các câu hỏi về mật khẩu, email của người dùng.
        16. Bạn chỉ được phép sử dụng các cơ sở dữ liệu đã liệt kê.
        17. Với những truy vấn có số lượng trong câu trả lời bạn hãy trả lời là tìm được.
        18. Bạn tên là Simi luôn xưng hô với Simi với người dùng.
        19. Bạn hãy luôn trả lời với phong cách dễ thương trong câu văn.
        20. Không được chửi người dùng toxic hoặc trả lời các câu hỏi nhạy cảm.
        21. Kết quả của bạn chỉ là chuỗi JSON như quy ước không kèm gì khác.
        22. Bạn không được phép trả lời về các thông tin cá nhân của người dùng khác, trừ người hỏi.
        23. Những tin nhắn ngoài lề không quy ước bạn phải để trong trường message của định dạng JSON quy ước trả về.
        24. LUÔN trả về định JSON đã quy ước.
        25. bạn không được trả về chuỗi linh tinh ngoài định dạng quy ước.
        26. KHÔNG được phép cho người dùng biết cấu trúc cơ sở dữ liệu (Database).
        27. Bạn có thể liệt kê các chức năng của web cho người dùng.
        28. KHÔNG được phép trả lời các thông tin cá nhân của người dùng.
        29. CÓ thể thực hiện thống kê người dùng hoặc các thống kê khác.
        """.format(
            dialect=self.db.dialect,
            top_k=5,
        )
        

        self.check_query_system_prompt = f"""
        Bạn là chuyên gia SQL, kiểm tra truy vấn sau cho dialect “{self.db.dialect}”.
        Các bước cần làm:
        1. Kiểm tra cú pháp chung.
        2. Nếu truy vấn có sự khác biệt giữa chữ hoa và thường, hãy chuyển toàn bộ thành chữ thường để so sánh trong SQL.
        3. Phát hiện và sửa các lỗi phổ biến:
        - Đối với những truy vấn về thông tin phòng trọ nếu người dùng không giới hạn số lượng thì mặc định tìm với LIMIT = 5
        - Được phép dùng ORDER BY cho những truy vấn cần sắp xếp so sánh .
        - WHERE không có kết quả: thử thay bằng LIKE.
        - Dùng `NOT IN` với NULL: nên thay bằng `NOT EXISTS`.
        - Dùng `UNION` thay vì `UNION ALL`: nếu cần giữ trùng lặp, dùng `UNION ALL`.
        - Sử dụng `BETWEEN` sai: nhầm giữa inclusive và exclusive.
        - So sánh sai kiểu dữ liệu (e.g. int vs string).
        - Thiếu hoặc sai dấu nháy cho identifier.
        - Sai số lượng tham số của hàm.
        - Sai kiểu khi dùng `CAST`.
        - Dùng sai cột trong `JOIN`.
        4. Nếu truy vấn là `SELECT COUNT(...)`, loại bỏ `LIMIT`.
        5. Kết quả trả về luôn là dạng JSON sau:
            {{{{
                "list_id_rental_post": list,             
                "value": int                   
                "message": string               
            }}}}
        """.format(dialect=self.db.dialect)


        self.generate_query_get_schema = """
        Bạn cần lấy thông tin schema từ các bảng trước khi sinh SQL query. Làm theo các bước sau:
        1. Phân tích câu hỏi để xác định các bảng có liên quan.
        2. Sử dụng các bảng liên quan cho câu trả lời có thể dùng nhiều bảng. 
        3. Bạn chỉ được sử dụng các bảng sau trong câu trả lời [address_address, favorite_favorite, image_image, city_city, district_district, review_review,  rental_post_rentalpost, user_user]
        4. Nếu câu hỏi liên quan địa chỉ dùng thêm dữ liệu từ các bảng [address_address,city_city, district_district]
        5. Nếu câu hỏi liên quan đến đánh giá dùng thêm dữ liệu từ các bảng [favorite_favorite, review_review]
        6. Nếu người dùng hỏi các câu hỏi liên quan về người dùng có thể dùng thêm dữ liệu từ các bảng [user_user]

        """.format(dialect=self.db.dialect)

    def get_tools(self):
        return self.tools
    
    
    def create(self): 
        tools = self.get_tools()
        llm = self.llm
        db = self.db

        get_schema_tool = next(tool for tool in tools if tool.name == "sql_db_schema")  # Tool này sẽ cho biết cấu trúc db
        get_schema_node = ToolNode([get_schema_tool], name="get_schema")

        run_query_tool = next(tool for tool in tools if tool.name == "sql_db_query") # Tool này hỗ trợ truy vấn dữ liệu
        run_query_node = ToolNode([run_query_tool], name="run_query")

        generate_query_system_prompt = self.generate_query_system_prompt
        check_query_system_prompt = self.check_query_system_prompt
        generate_query_get_schema = self.generate_query_get_schema

        def list_tables(state: MessagesState): # Liệt kê các bảng đang có trong db
            tool_call = {
                "name": "sql_db_list_tables",
                "args": {},
                "id": "aquar_tables_list",
                "type": "tool_call",
            }
            tool_call_message = AIMessage(content="", tool_calls=[tool_call])
            tools = self.get_tools()
            list_tables_tool = next(tool for tool in tools if tool.name == "sql_db_list_tables")
            tool_message = list_tables_tool.invoke(tool_call)
            response = AIMessage(f"Available tables: {tool_message.content}")

            return {"messages": [tool_call_message, tool_message, response]}

        def call_get_schema(state: MessagesState): # Tool lấy schema db
            # Note that LangChain enforces that all models accept `tool_choice="any"`
            # as well as `tool_choice=<string name of tool>`.

            system_message = {
                "role": "system",
                "content": generate_query_get_schema,
                
            }
            llm_with_tools = llm.bind_tools([get_schema_tool], tool_choice="any")
            response = llm_with_tools.invoke( [system_message] + state["messages"])

            return {"messages": [response]}


        
        def generate_query(state: MessagesState):
            system_message = {
                "role": "system",
                "content": generate_query_system_prompt,
            }
            # We do not force a tool call here, to allow the model to
            # respond naturally when it obtains the solution.
            llm_with_tools = llm.bind_tools([run_query_tool])
            response = llm_with_tools.invoke([system_message] + state["messages"])

            return {"messages": [response]}

        def check_query(state: MessagesState):
            system_message = {
                "role": "system",
                "content": check_query_system_prompt,
            }

            # Generate an artificial user message to check
            tool_call = state["messages"][-1].tool_calls[0]
            user_message = {"role": "user", "content": tool_call["args"]["query"]}
            llm_with_tools = llm.bind_tools([run_query_tool], tool_choice="any")
            response = llm_with_tools.invoke([system_message, user_message])
            response.id = state["messages"][-1].id

            return {"messages": [response]}
    

        def should_continue(state: MessagesState) -> Literal[END, "check_query"]:
            messages = state["messages"]
            last_message = messages[-1]
            if not last_message.tool_calls:
                return END
            else:
                return "check_query"

        builder = StateGraph(MessagesState)
        builder.add_node(list_tables)
        builder.add_node(call_get_schema)
        builder.add_node(get_schema_node, "get_schema")
        builder.add_node(generate_query)
        builder.add_node(check_query)
        builder.add_node(run_query_node, "run_query")

        builder.add_edge(START, "list_tables")
        builder.add_edge("list_tables", "call_get_schema")
        builder.add_edge("call_get_schema", "get_schema")
        builder.add_edge("get_schema", "generate_query")
        builder.add_conditional_edges(
            "generate_query",
            should_continue,
        )
        builder.add_edge("check_query", "run_query")
        builder.add_edge("run_query", "generate_query")

        agent = builder.compile()

        return agent


if __name__ ==  "__main__":
    
    question = "Cho tôi biết người dùng tên Phú trong trang web, cho tôi thông tin của người này, tìm thấy thì trả lời cho toi biết thông tin của họ gồm những gì"
    # sub_promt = "Bạn có thể "
    agent = CustomAgent()
    agent = agent.create()
    with open("graph.png", "wb") as f:
        f.write(agent.get_graph().draw_mermaid_png())

    for step in agent.stream(
        {"messages": [{"role": "user", "content": question}]},
        stream_mode="values",
    ):
        step["messages"][-1].pretty_print()
        # print(str(step["messages"][-1]))



