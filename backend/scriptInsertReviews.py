from datetime import datetime
import pandas as pd
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
from django.contrib.auth import get_user_model
from review.models import RentalPost, Review

# Đường dẫn tới file Excel
file_path = "E:\dummy_reviews.xlsx"
User = get_user_model()
# Đọc file Excel
df = pd.read_excel(file_path, sheet_name='Reviews')

for index, row in df.iterrows():
    try:
        # Lấy thông tin từ mỗi dòng
        rental_post_id = row['rental_post_id']
        user_email = row['user_email']
        rating = float(row['rating'])
        comment = row['comment']
        time = datetime.strptime(str(row['time']), '%Y-%m-%d %H:%M:%S.%f')

        # Tăng giá trị rental_post_id lên 10266 đơn vị
        rental_post_id += 10266

        # Tìm RentalPost theo id đã tăng
        rental_post = RentalPost.objects.get(id=rental_post_id)

        # Tìm hoặc tạo User theo email
        user, created = User.objects.get_or_create(email=user_email)

        # Tạo và lưu Review
        review = Review(
            rental_post=rental_post,
            user=user,
            rating=rating,
            comment=comment,
            time=time
        )
        review.save()
        print(f'Successfully inserted review by {user_email} for post {rental_post_id}')
    
    except RentalPost.DoesNotExist:
        print(f"RentalPost with ID {rental_post_id} does not exist.")
        break
    except Exception as e:
        print(f'Error inserting review: {e}')
        break
