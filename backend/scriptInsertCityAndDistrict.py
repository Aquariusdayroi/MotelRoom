import os
import sys
import django

# Setup Django
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ''))
sys.path.append(os.path.join(BASE_DIR, 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

import openpyxl
from city.models import City
from district.models import District

# Đường dẫn tới file .xlsx
file_path = "E:\database.xlsx"  # đổi path thật nhé

# Mở file Excel
wb = openpyxl.load_workbook(file_path)
sheet = wb.active  # lấy sheet đầu tiên

# Duyệt qua từng dòng, bỏ qua dòng header (giả sử dòng 1 là header)
for row in sheet.iter_rows(min_row=2, values_only=True):
    maquan, tenquan, matt, tent = row  # lấy 4 cột

    # 1. Insert City nếu chưa có
    city_obj, created = City.objects.get_or_create(
        name_city=tent
    )

    district_name = tenquan.strip()

    # Check nếu District đã tồn tại
    if not District.objects.filter(name_district=district_name).exists():
        District.objects.create(
            name_district=district_name,
            city=city_obj
        )


print("Đã import xong dữ liệu.")
