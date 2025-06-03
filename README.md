# 🏠 MotelRoom

**MotelRoom Simi** là một nền tảng tìm kiếm phòng trọ thông minh dành cho sinh viên và người lao động, được phát triển với mục tiêu giải quyết tình trạng thông tin thuê trọ phân mảnh, không xác thực và thiếu minh bạch trên các nền tảng hiện nay.

Dự án ứng dụng kiến trúc **Retrieval-Augmented Generation (RAG)** kết hợp với các công nghệ hiện đại như **ReactJS**, **Django**, và **SQLite**, nhằm mang đến trải nghiệm tìm kiếm phòng trọ hiệu quả, đáng tin cậy và cá nhân hóa cho người dùng.

---

## 📌 Tính năng chính

- 🔍 **Tìm kiếm thông minh**: Đề xuất phòng trọ phù hợp dựa trên nhu cầu và ngữ cảnh của người dùng.
- 👤 **Quy trình đăng bài**: Có quy trình đăng bài và quy trình làm chủ trọ minh bạch , nâng cao độ tin cậy thông qua hệ thống xác minh danh tính.
- 🗺️ **Map**: Người dùng có thể xem địa chỉ phòng trọ hiệu quả hơn thông qua map của trang web.
- 🌟 **Đánh giá và nhận xét minh bạch**: Người dùng có thể chia sẻ trải nghiệm và xem đánh giá từ người khác.
- 🚗 **Admin, Owner**: Có dash board để xem các thông số và các chức năng quản lý liên quan nhằm tăng tính quản lý hiệu quả cho chủ trọ và admin.
- ⚙️ **Hiệu suất tối ưu**: Giao diện mượt mà với ReactJS và xử lý dữ liệu nhanh chóng với Django + SQLite.

---

## 🛠️ Công nghệ sử dụng

- **Frontend**: [ReactJS](https://reactjs.org/)
- **Backend**: [Django](https://www.djangoproject.com/) + Django REST Framework
- **Database**: SQLite
- **AI/ML**: Retrieval-Augmented Generation (RAG) để hỗ trợ hệ thống gợi ý

---

## 🚀 Cài đặt & chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/yourusername/motelroom.git
cd motelroom
```

### 2. Run backend
Mở một cmd cho backend và thực hiện chạy các lệnh sau:
```bash
cd backend
python -m venv myenv
myenv\Scripts\activate # Trên macos source myenv/bin/activate 
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python scripts.py #Chạy script để thêm dữ liệu vào db 
python manage.py runserver
```

### 3. Run frontend
Mở một cmd cho frontend và thực hiện chạy các lệnh sau:Mở một cmd khác
```bash
cd frontend
npm install
npm start
```
### 4. Setting key môi trường
Ở frontend nếu bạn muốn dùng chức năng map hãy tạo file môi trường .env ở thư mục frontend và bổ sung key REACT_APP_MAPBOX_TOKEN= "YOUR KEY" được lấy từ trang web https://console.mapbox.com/
Ở backend nếu bạn muốn dùng các chức năng của google hãy tạo file môi trường .env ở thư mục backend và bổ sung key EMAIL_HOST_USER="Your email"

EMAIL_HOST_PASSWORD= "Pass của dự án"
DEFAULT_FROM_EMAIL=${EMAIL_HOST_USER}

