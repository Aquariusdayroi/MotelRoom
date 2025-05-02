from rest_framework.test import APITestCase
from rest_framework import status
from user.models import User, OwnerRequest
from Address.models import City
from django.urls import reverse
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.files.uploadedfile import SimpleUploadedFile
from unittest.mock import patch
from datetime import datetime, date, timedelta

# # Test API register
# class RegisterAPITestCase(APITestCase):

#     def setUp(self):
#         self.url = reverse('register') 

#     def test_register_user_success(self):
#     # đăng ký người dùng thành công
#         data = {
#             'email': 'testuser@example.com',
#             'fullname': 'Test User',
#             'password': 'TestPassword123',
#             'password2': 'TestPassword123'
#         }
#         response = self.client.post(self.url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertTrue(User.objects.filter(email='testuser@example.com').exists())

#     def test_register_user_password_mismatch(self):
#     # Đăng ký nhập khác mật khẩu
#         data = {
#             'email': 'testuser@example.com',
#             'fullname': 'Test User',
#             'password': 'TestPassword123',
#             'password2': 'DifferentPassword123'
#         }
#         response = self.client.post(self.url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertIn('password', response.data['errors'])
#         self.assertIn('Mật khẩu không khớp.', response.data['errors']['password'][0])


#     def test_register_user_email_taken(self):
#     # Đăng ký email đã tồn tại
#         User.objects.create_user(email='testuser@example.com', password='TestPassword123', fullname='Test User')
#         data = {
#             'email': 'testuser@example.com',
#             'fullname': 'Another User',
#             'password': 'TestPassword123',
#             'password2': 'TestPassword123'
#         }
#         response = self.client.post(self.url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertIn('email', response.data['errors'])
#         self.assertIn('Email đã tồn tại.', response.data['errors']['email'][0])

# # Test API đăng nhập
# class LoginAPITestCase(APITestCase):

#     def setUp(self):
#         self.url = reverse('token_obtain_pair') 
#         self.user = User.objects.create_user(
#             email='testuser@example.com',
#             password='TestPassword123',
#             fullname='Test User'
#         )

#     def test_login_success(self):
#     # Đăng nhập thành công
#         data = {
#             'email': 'testuser@example.com',
#             'password': 'TestPassword123'
#         }
#         response = self.client.post(self.url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('access', response.data)
#         self.assertIn('refresh', response.data)

#     def test_login_invalid_credentials(self):
#     # Đăng nhập sai mật khẩu
#         data = {
#             'email': 'testuser@example.com',
#             'password': 'WrongPassword123'
#         }
#         response = self.client.post(self.url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED) 
#         self.assertIn('message', response.data) 
#         self.assertIn('Tài khoản hoặc mật khẩu không đúng.', response.data['message'])

#     def test_login_inactive_user(self):
#     # Đăng nhập tài khoản chưa đăng ký
#         self.user.is_active = False
#         self.user.save()
#         data = {
#             'email': 'testuser@example.com',
#             'password': 'TestPassword123'
#         }
#         response = self.client.post(self.url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
#         self.assertIn('message', response.data) 
#         self.assertIn('Tài khoản hoặc mật khẩu không đúng.', response.data['message'])

# # Test API xác thực email
# class EmailVerificationAPITestCase(APITestCase):

#     def setUp(self):
#         self.user = User.objects.create_user(
#             email='testuser@example.com',
#             password='TestPassword123',
#             fullname='Test User'
#         )
#         self.user.is_active = False
#         self.user.save()
#         self.token = default_token_generator.make_token(self.user)
#         self.uid = urlsafe_base64_encode(force_bytes(self.user.pk))
#         self.url = reverse('verify-email', kwargs={'uidb64': self.uid, 'token': self.token})

#     def test_verify_email_success(self):
#     # Xác thực thành công
#         response = self.client.get(self.url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.user.refresh_from_db()
#         self.assertTrue(self.user.is_active)

#     def test_verify_email_invalid_token(self):
#     # Sai mã xác thực
#         invalid_token = "invalid-token"
#         invalid_url = reverse('verify-email', kwargs={'uidb64': self.uid, 'token': invalid_token})
#         response = self.client.get(invalid_url)
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
# # Test API gửi yêu cầu đăng ký thành owner
# class OwnerRequestAPITestCase(APITestCase):

#     def setUp(self): 
#         self.user = User.objects.create_user(
#             email='testuser@example.com',
#             password='TestPassword123',
#             fullname='Test User'
#         )
#         self.admin = User.objects.create_user(
#             email='admin@example.com',
#             password='AdminPassword123',
#             fullname='Admin User',
#             role='admin',
#             is_staff=True
#         )
        
#         self.url = reverse('owner-request-list')    
#         self.client.force_authenticate(user=self.user)  
    
#     def test_request_owner_role(self):
#         # Gửi yêu cầu đăng ký thành owner
#         with open('media/cccd/front/sample_front.jpg', 'rb') as front, open('media/cccd/back/sample_back.jpg', 'rb') as back:
#             data = {
#                 'cccd': '123456789',
#                 'image_front_cccd': SimpleUploadedFile('front.jpg', front.read(), content_type='image/jpeg'),
#                 'image_back_cccd': SimpleUploadedFile('back.jpg', back.read(), content_type='image/jpeg')
#             }
#         response = self.client.post(self.url, data, format='multipart')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertIn('message', response.data)
#         self.assertEqual(response.data['message'], 'Yêu cầu đã được gửi thành công.')
        
#     def test_admin_get_owner_request_list_with_requests(self):
#         # Lấy danh sách yêu cầu (Có)
#         OwnerRequest.objects.create(
#             user=self.user,
#             cccd="123456789",
#             image_front_cccd="media/cccd/front/sample_front.jpg",
#             image_back_cccd="media/cccd/back/sample_back.jpg"
#         )
#         url = reverse('owner-request-get-list')
#         self.client.force_authenticate(user=self.admin)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('requests', response.data)
#         self.assertTrue(response.data['success'])
#         self.assertEqual(response.data['message'], 'Lấy danh sách yêu cầu thành công.')
#         self.assertGreater(len(response.data['requests']), 0)

#     def test_admin_get_owner_request_list_without_requests(self):
#         # Lấy danh sách yêu cầu (Không)
#         url = reverse('owner-request-get-list')
#         self.client.force_authenticate(user=self.admin)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('requests', response.data)
#         self.assertTrue(response.data['success'])
#         self.assertEqual(response.data['message'], 'Lấy danh sách yêu cầu thành công.')
#         self.assertEqual(response.data['requests'], [])
        
# # Test API admin duyệt yêu cầu
# class AdminApprovalTestCase(APITestCase):

#     def setUp(self):
#         self.user = User.objects.create_user(
#             email='testuser@example.com',
#             password='TestPassword123',
#             fullname='Test User'
#         )
#         self.admin = User.objects.create_user(
#             email='admin@example.com',
#             password='AdminPassword123',
#             fullname='Admin User',
#             role='admin',
#             is_staff=True
#         )

#         self.client.force_authenticate(user=self.admin)  

#         self.owner_request = OwnerRequest.objects.create(user=self.user)

#     def test_approve_owner_request(self):
#     # Duyệt yêu cầu
#         url = reverse('owner-request-approve', args=[self.owner_request.id])
#         response = self.client.post(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.owner_request.refresh_from_db() 
#         self.assertEqual(self.owner_request.status, 'approved') 
#         self.assertIn('message', response.data)
#         self.assertEqual(response.data['message'], 'Yêu cầu đã được duyệt.')

#     def test_deny_owner_request(self):
#     # Từ chối yêu cầu
#         url = reverse('owner-request-reject', args=[self.owner_request.id])
#         response = self.client.post(url, data={'reason': 'Không hợp lệ'})
        
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.owner_request.refresh_from_db() 
#         self.assertEqual(self.owner_request.status, 'rejected') 
#         self.assertIn('message', response.data)
#         self.assertEqual(response.data['message'], 'Yêu cầu đã bị từ chối.')

# # Test API đăng nhập Google
# class GoogleLoginAPITestCase(APITestCase):
#     @patch('user.api.serializers.id_token.verify_oauth2_token')
#     def test_google_login_success(self, mock_verify_token):
#         # Giả lập thông tin trả về từ Google
#         mock_verify_token.return_value = {
#             'email': 'testuser@example.com',
#             'name': 'Test User',
#             'sub': '1234567890'
#         }

#         url = reverse('google-login') 
#         response = self.client.post(url, {'token': 'valid_google_token'}, format='json')

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('access', response.data)
#         self.assertIn('refresh', response.data)
#         self.assertEqual(response.data['user']['email'], 'testuser@example.com')

#     @patch('user.api.serializers.id_token.verify_oauth2_token')
#     def test_google_login_invalid_token(self, mock_verify_token):
#         # Giả lập token không hợp lệ
#         mock_verify_token.side_effect = ValueError("Token không hợp lệ")

#         url = reverse('google-login')
#         response = self.client.post(url, {'token': 'invalid_token'}, format='json')

#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertIn('errors', response.data)
        
# Test API lấy danh sách user của admin
class UserListCreateAPITestCase(APITestCase):

    def setUp(self):
        self.city = City.objects.create(name_city='Hanoi')
        
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='TestPassword123',
            fullname='Test User',
            role='user',
            is_active=True,
        )
        self.admin = User.objects.create_user(
            email='admin@example.com',
            password='AdminPassword123',
            fullname='Admin User',
            role='admin',
            is_staff=True
        )
        self.owner = User.objects.create_user(
            email='owner@example.com',
            password='OwnerPassword123',
            fullname='Owner User',
            role='owner',
            city=self.city,
            is_active=True,
        )
        self.user = User.objects.create_user(
            email='user1@example.com',
            password='UserPassword123',
            fullname='User One',
            role='owner',
            created=date.today(),  # Hôm nay
            is_active=True,
        )
        self.user = User.objects.create_user(
            email='user2@example.com',
            password='UserPassword123',
            fullname='User Two',
            role='owner',
            created=date.today() - timedelta(days=1),  # Một ngày trước
            is_active=True,
        )

        self.url = reverse('admin-request-get-list')
        
    def test_admin_get_user_list(self):
        # Test admin lấy danh sách người dùng
        self.client.force_authenticate(user=self.admin) 
        response = self.client.get(self.url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['message'], 'Lấy danh sách người dùng thành công.')
        self.assertTrue(any(u['email'] == self.user.email for u in response.data['users']))
        
    def test_non_admin_get_user_list(self):
        # Test không phải admin lấy danh sách người dùng
        self.client.force_authenticate(user=self.user)  
        response = self.client.get(self.url)
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertFalse(response.data['success'])
        self.assertEqual(response.data['message'], 'Permission denied.')
        
    def test_admin_get_user_list_with_multiple_filters(self):
        # Test admin lấy danh sách người dùng với nhiều bộ lọc (VD: role và city)
        self.client.force_authenticate(user=self.admin)  
        response = self.client.get(self.url, {'role': 'owner', 'City': 'Hanoi'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['message'], 'Lấy danh sách người dùng thành công.')
        self.assertTrue(any(u['email'] == self.owner.email for u in response.data['users']))
        
    def test_admin_delete_user(self):
        # Test admin xóa người dùng
        self.client.force_authenticate(user=self.admin)  
        response = self.client.delete(reverse('admin-request-delete', args=[self.user.id]))
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(id=self.user.id).exists())
        self.assertTrue(response.data['success'])
        
    def test_admin_cannot_delete_admin(self):
        # Test admin không thể xóa chính mình
        self.client.force_authenticate(user=self.admin)  
        response = self.client.delete(reverse('admin-request-delete', args=[self.admin.id]))
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(User.objects.filter(id=self.admin.id).exists())
        self.assertFalse(response.data['success'])
        
    def test_stat_with_multiple_filters(self):
        # Test thống kê người dùng theo nhiều bộ lọc (role)
        self.client.force_authenticate(user=self.admin)
        url = reverse('admin-request-stat') + '?fields=role&role=owner'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertIn('statistics', response.data)
        self.assertIn('role', response.data['statistics'])
        self.assertTrue(response.data['filtered_users'] <= response.data['total_users'])

    def test_stat_with_created(self):
        # Test thống kê với filter 'created' cho ngày hôm nay
        self.client.force_authenticate(user=self.admin)
        today = date.today().isoformat()
        url = reverse('admin-request-stat') + f'?fields=role&created={today}'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertIn('statistics', response.data)
        self.assertIn('role', response.data['statistics'])
        self.assertTrue(response.data['filtered_users'] <= response.data['total_users'])

    def test_stat_with_created_range(self):
        # Test thống kê với filter 'created' trong khoảng thời gian
        self.client.force_authenticate(user=self.admin)
        today = date.today().isoformat()
        yesterday = (date.today() - timedelta(days=1)).isoformat()
        url = reverse('admin-request-stat') + f'?fields=role&created__gte={yesterday}&created__lte={today}'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertIn('statistics', response.data)
        self.assertIn('role', response.data['statistics'])
        self.assertTrue(response.data['filtered_users'] <= response.data['total_users'])

    def test_stat_with_multiple_fields(self):
        # Test thống kê với nhiều filter 'role' và 'city'
        self.client.force_authenticate(user=self.admin)
        url = reverse('admin-request-stat') + '?fields=role,city&role=owner&city=1'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertIn('statistics', response.data)
        self.assertIn('role', response.data['statistics'])
        self.assertIn('city', response.data['statistics'])

    def test_stat_missing_fields_param(self):
        # Test khi thiếu 'fields' param
        self.client.force_authenticate(user=self.admin)
        url = reverse('admin-request-stat')  # Không truyền 'fields'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 400)
        self.assertFalse(response.data['success'])
        self.assertEqual(response.data['message'], "Thiếu tham số fields. Ví dụ: ?fields=role,city")
        
# # Test API người dùng xem, cập nhật và xóa tài khoản
# class UserRetrieveUpdateDestroyAPITestCase(APITestCase):
    
    # def setUp(self):
    #     self.user = User.objects.create_user(
    #         email='testuser@example.com',
    #         password='TestPassword123',
    #         fullname='Test User'
    #     )

    #     self.url = reverse('user-detail')
    
    # def test_user_can_view_update_delete_self(self):
    #     self.client.force_authenticate(user=self.user)
        
    #     # Test xem thông tin tài khoản
    #     response = self.client.get(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertIn('user', response.data)
        
    #     # Test cập nhật thông tin tài khoản
    #     response = self.client.put(self.url, {
    #         'fullname': 'Updated User',
    #     })
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data['user']['fullname'], "Updated User")
        
    #     # Test xóa tài khoản
    #     response = self.client.delete(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)