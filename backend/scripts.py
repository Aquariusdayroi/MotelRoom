import pandas as pd
import os
import django
from tqdm import tqdm
import random
from unidecode import unidecode
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()


from city.models import City
from district.models import District
from rental_post.models import RentalPost
from address.models import Address
from django.contrib.auth import get_user_model


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
            )
    except Exception as e:
        print(f"Lỗi thêm dữ liệu user: {e}")




def AddDataRentalPost(path: str, sheet_name: str) -> None: 
    df = pd.read_excel(path, sheet_name=sheet_name, header=0, index_col=False)
    RentalPost.objects.all().delete()
    try:
        for _, row in tqdm(df.iterrows(), desc= "Thêm Dữ Liệu Bài Đăng", total=len(df)):
            # print(row["Ngày đăng"], type(row["Ngày đăng"]))
            # break
            # print(row["Thành phố"])
            city = City.objects.filter(name_city__icontains = "Thành phố Hồ Chí Minh").first()
            district = District.objects.filter(name_district__icontains = row["Quận/Huyện"], city = city).first() 
            address, created = Address.objects.get_or_create(
                city=city,
                district=district,
                description=row["Địa chỉ"]
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
                create_at = row["Ngày đăng"]
            )
    except Exception as e:
        print(f"Lỗi khi thêm dữ liệu bài đăng: {e}")
    pass


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


if __name__ == "__main__":
    AddDataCity("database.xlsx", "Sheet2")
    AddDataDistrict("database.xlsx", "Sheet1")
    AddDataUser("data_user.xlsx", "Sheet1")
    AddDataRentalPost('processed_data2.xlsx', "Sheet1")



