import cv2
import numpy as np

def crop_four_corners(img):
    h, w = img.shape[:2]
    
    # Cắt 4 góc
    top_left = img[:h//4, :w//4]       # Góc trên trái
    top_right = img[:h//4, w - w//4:]  # Góc trên phải
    bottom_left = img[h - h//4:, :w//4] # Góc dưới trái
    bottom_right = img[h - h//4:, w - w//4:] # Góc dưới phải
    
    return top_left, top_right, bottom_left, bottom_right

def zoom_in_on_corner(corner_img):
    zoomed = cv2.resize(corner_img, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC)
    return zoomed


def preprocess_for_qr(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    eq = cv2.equalizeHist(gray)
    blur = cv2.GaussianBlur(eq, (3, 3), 0)
    
    # Làm nét
    kernel = np.array([[0, -1, 0],
                       [-1, 5,-1],
                       [0, -1, 0]])
    sharpened = cv2.filter2D(blur, -1, kernel)

    # Resize để phóng lớn ảnh
    processed = cv2.resize(sharpened, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC)
    
    return processed


def detect_qr_in_zoomed_corners(img):
    corners = crop_four_corners(img)
    detector = cv2.QRCodeDetector()
    
    for corner in corners:
        zoomed_corner = zoom_in_on_corner(corner)
        img_check = preprocess_for_qr(zoomed_corner)
        data, bbox, _ = detector.detectAndDecode(img_check)
        
        if data:
            return data  # Trả về dữ liệu QR khi tìm thấy

    return None  # Nếu không tìm thấy QR trong bất kỳ góc nào


img = cv2.imread("E:\\my_id.jpg")  # Đường dẫn đến ảnh của bạn
print(detect_qr_in_zoomed_corners(img))