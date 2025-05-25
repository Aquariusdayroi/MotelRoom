import pandas as pd
import os
import django
from tqdm import tqdm
import random
from unidecode import unidecode
from datetime import datetime
import shutil
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.core.files import File

from city.models import City
from district.models import District
from rental_post.models import RentalPost
from address.models import Address
from django.contrib.auth import get_user_model
from image.models import Image
from review.models import Review
import requests

def AddDataCity(path: str, sheet_name: str) -> None:
    City.objects.all().delete()
    df = pd.read_excel(path, sheet_name=sheet_name, header=0, index_col=None)
    try: 
        for _, row in tqdm(df.iterrows(), desc="Thêm Dữ Liệu Thành Phố", total= len(df)):
            City.objects.create(
                id = row["MATT"],
                name_city = row["TENTT"],
            ) 
    except Exception as e:
        raise RuntimeError(f"Lỗi thực thi khi thêm dữ liệu thành phố: {e}")    

def AddDataDistrict(path: str, sheet_name: str) -> None:    
    District.objects.all().delete()
    df = pd.read_excel(path, sheet_name=sheet_name, header=0, index_col=None)
    try: 
        for _, row in tqdm(df.iterrows(), desc="Thêm Dữ Liệu Quận", total= len(df)):
            District.objects.create(
                id = row["MAQUAN"],
                name_district = row["TENQUAN"],
                city = City.objects.get(id = row["MATT"])
            ) 
    except Exception as e:
        raise RuntimeError(f"Lỗi thực thi khi thêm dữ liệu quận: {e}")    

def AddDataUser(path: str, sheet_name: str) -> None: 
    User = get_user_model()
    User.objects.exclude(role = "admin").delete()
    df = pd.read_excel(path, sheet_name= sheet_name, header=0, index_col= None)
    try: 
        for _, row in tqdm(df.iterrows(), desc= "Thêm Dữ Liệu Người Dùng", total= len(df)): 
            User.objects.create_user(
                email = row["Email"], 
                fullname = row["Họ tên"],
                password = row["Password"], 
                phone_number = row["Số điện thoại"],    
                role = 'owner',
            )
    except Exception as e:
        print(f"Lỗi thêm dữ liệu user: {e}")

def AddDataRentalPost(path: str, sheet_name: str) -> None: 
    df = pd.read_excel(path, sheet_name=sheet_name, header=0, index_col=False)
    df = df.drop(columns=['idx'])
    df = df.drop_duplicates()
    RentalPost.objects.all().delete()
    Address.objects.all().delete()

    try:
        for _, row in tqdm(df.iterrows(), desc= "Thêm Dữ Liệu Bài Đăng", total=len(df)):
            city = City.objects.filter(name_city__icontains = row["Thành phố"]).first()
            district = District.objects.filter(name_district__icontains = row["Quận/Huyện"], city = city).first() 
            address, created = Address.objects.get_or_create(
                city=city,
                district=district,
                description=row["Địa chỉ"].lower().strip()
            )
            User = get_user_model()
            user = User.objects.get(email = row["Email"])
            RentalPost.objects.create(
                user = user, 
                home_type = row["Kiểu phòng"],
                title = row["Tiêu đề"],
                information_detail = row["Nội dung"],
                address = address, 
                total_occupancy = 1,
                acreage = row["Diện tích"],
                price = row["Giá"],
                create_at = row["Ngày đăng"],
                is_public = True,

                # Tiện nghi cơ bản
                has_wifi=random.choice([True, False]),
                has_tv=random.choice([True, False]),
                has_kitchen=random.choice([True, False]),
                has_washing_machine=random.choice([True, False]),
                has_parking=random.choice([True, False]),
                has_fridge=random.choice([True, False]),
                has_air_conditioner=random.choice([True, False]),
                has_attic=random.choice([True, False]),
                has_water_heater=random.choice([True, False]),

                # Tiện nghi thêm
                has_dehumidifier=random.choice([True, False]),
                has_hot_tub=random.choice([True, False]),
                has_balcony=random.choice([True, False]),
                has_elevator=random.choice([True, False]),
                has_microwave=random.choice([True, False]),

                # Tiện nghi an toàn
                has_security_camera=random.choice([True, False]),
                has_first_aid_kit=random.choice([True, False]),
                has_fingerprint_lock=random.choice([True, False])
            )
    except Exception as e:
        print(f"Lỗi khi thêm dữ liệu bài đăng: {e}")
    pass

def AddDataImage(path: str, sheet_name: str) -> None: 
    df = pd.read_excel(path, sheet_name=sheet_name, header=0, index_col=False)
    df = df.drop(columns=['idx'])
    df = df.drop_duplicates()
    for image in tqdm(Image.objects.all(), desc="Đang Xóa Hình Ảnh", total=len(Image.objects.all())):
        image.delete()  

    try:
        for _, row in tqdm(df.iterrows(), desc="Thêm Dữ Liệu Hình Ảnh Bài Đăng", total=len(df)):
            city = City.objects.filter(name_city__icontains = row["Thành phố"]).first()
            district = District.objects.filter(name_district__icontains = row["Quận/Huyện"], city = city).first() 
            address, created = Address.objects.get_or_create(
                city=city,
                district=district,
                description=row["Địa chỉ"].lower().strip()
            )
            
            
            rental_post = RentalPost.objects.filter(
                home_type = row["Kiểu phòng"],
                title = row["Tiêu đề"],
                information_detail = row["Nội dung"],
                address = address, 
                total_occupancy = 1,
                acreage = row["Diện tích"],
                price = row["Giá"],
            ).first()

            img_path = os.path.join("images_rentalpost", row["Image"].split("\\")[1])
            try: 
                for filename in os.listdir(img_path):
                    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                        file_path = os.path.join(img_path, filename)
                        with open(file_path, 'rb') as f:
                            django_file = File(f)
                            image = Image.objects.create(
                                rental_post=rental_post,
                                image_url=django_file
                            )
            except FileNotFoundError:
                print(f"Thư mục {img_path} không tồn tại")
    except Exception as e:
        print(f"Lỗi khi thêm dữ liệu hình ảnh bài đăng: {e}")


def FillPhoneNumber(x: str) -> str: 
    number = "".join(str(random.randint(0, 9)) for i in range(4))
    return x.replace("****", number)

def CreatePassword(x: str) -> str: 
    return unidecode(x).lower().replace(" ", "")

def CreateDataUser() -> None: 
    df = pd.read_excel("processed_data2.xlsx", sheet_name="Sheet1", header=0, index_col= None)
    df_user = pd.DataFrame()

    df_user =  df[["Email", "Họ tên", "Số điện thoại"]].drop_duplicates()
    df_user["Số điện thoại"] = df_user["Số điện thoại"].apply(FillPhoneNumber)
    df_user["Password"] = df_user["Họ tên"].apply(CreatePassword)
    print(any(df_user["Số điện thoại"].duplicated()))
    print(len(df_user))
    print(df_user.head())
    df_user.to_excel("data_user.xlsx", index=False)

def AddLatitudeLongitude() -> None: 
    data = Address.objects.all()
    for address in tqdm(data, total= len(data), desc="Thêm Tọa Độ Địa Chỉ"): 
        search_text = address.description
        url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{search_text}.json"
        params = {
            "access_token": "pk.eyJ1Ijoia2hhbmh2bjMxMDMiLCJhIjoiY21hYmFuaXF6MjhzbTJqcXp3dHRmcm8yaiJ9.ceexBpDLsIvcLV7kGYKpHA",
            "language": "vi",
            "country": "VN",
            "limit": 1
        }
        response = requests.get(url, params=params)
        data = response.json()
        try:
            coordinates = data["features"][0]["geometry"]["coordinates"]
            address.longitude = coordinates[0]
            address.latitude = coordinates[1]
            address.save()
        except Exception as e: 
                print(f"Không tìm thấy địa chỉ.{ address.description}")
                

def AddDataReview(path: str, sheet_name: str) -> None: 
    df = pd.read_excel(path, sheet_name=sheet_name, header=0, index_col=False)
    df = df.drop_duplicates()
    User = get_user_model()
# Đọc file Excel
# df = pd.read_excel(file_path, sheet_name='Reviews')
    Review.objects.all().delete()

    for index, row in tqdm(df.iterrows(), total=len(df), desc= "thêm dữ liệu bài đăng"):
        try:
            # Lấy thông tin từ mỗi dòng
            rental_post_id = row['rental_post_id']
            user_email = row['user_email']
            rating = float(row['rating'])
            comment = row['comment']
            time = datetime.strptime(str(row['time']), '%Y-%m-%d %H:%M:%S.%f')  
            rental_post = RentalPost.objects.get(id=rental_post_id)
            user, created = User.objects.get_or_create(email=user_email)
            review = Review(
                rental_post=rental_post,
                user=user,
                rating=rating,
                comment=comment,
                time=time
            )
            review.save()    
        except RentalPost.DoesNotExist:
            print(f"RentalPost with ID {rental_post_id} does not exist.")
        except Exception as e:
            print(f'Error inserting review: {e}')
    

if __name__ == "__main__":    
    # AddDataCity("database.xlsx", "Sheet2")
    # AddDataDistrict("database.xlsx", "Sheet1")
    # AddDataUser("data_user.xlsx", "Sheet1")
    # AddDataRentalPost('processed_data2.xlsx', "Sheet1")
    # AddDataImage('new_data.xlsx', 'Sheet1')
    # AddLatitudeLongitude()
    # RentalPost.objects.all().update(is_public=True)
    AddDataReview('dummy_reviews.xlsx', "Reviews")