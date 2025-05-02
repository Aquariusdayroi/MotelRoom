import pandas as pd
from unidecode import unidecode

# Đọc file Excel (thay thế bằng tên file bạn có)
file_path = "E:\Crawldata\processed_data.xlsx"  # Đổi thành file của bạn nếu cần
df = pd.read_excel(file_path)

# Hàm tách họ tên, số điện thoại và tạo email
def process_row(row):
    parts = str(row).rsplit('-', 1)
    if len(parts) != 2:
        return pd.Series([None, None, None])
    name = parts[0].strip()
    phone = parts[1].strip()
    last3 = phone[-3:] if len(phone) >= 3 else ''
    email = unidecode(name.replace(" ", "").lower()) + last3 + "@gmail.com"
    return pd.Series([name, phone, email])

# Xử lý cột 'Người đăng'
df[['HoTen', 'SoDienThoai', 'Email']] = df['Người đăng'].apply(process_row)

# Xuất kết quả ra file Excel
df.to_excel('E:\Crawldata\processed_dat.xlsx', index=False)
