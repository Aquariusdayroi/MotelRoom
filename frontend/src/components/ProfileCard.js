import React from 'react';
import avatar from '../assets/management-img/avt-dat.png';
import star from '../assets/management-img/star.png';
import '../styles/Profile.css';

export default function ProfileCard() {
  return (
    <div className='container d-flex align-items-center justify-content-center'>
      <div className="profile-box text-center">
        <div className="customer mb-3">
          <img
            src={avatar}
            alt="Avatar"
            className="img-fluid rounded-circle mb-3"
          />
          <h3 style={{fontWeight: 700}}>Đắt Ender</h3>
        </div>
        <div className="rate-customer mb-3">
          <div className="head-rate d-flex align-items-center justify-content-center">
            <img src={star} alt="Star" className="img-fluid"/>
            <h6 className="mb-0">3.9/5</h6>
          </div>
        </div>
        <div className="content">
        <h6 style={{ fontWeight: 100 }}>lượt đánh giá trung bình</h6>
          <p style={{fontStyle:'italic'}}>69 lượt đăng bài</p>
          <p style={{fontStyle:'italic'}}>69 lượt đánh giá</p>
        </div>
        <div className='contact'>
          <h5 style={{ fontWeight: 600 }}>Thông tin liên hệ</h5>
          <div className='contact-customer'>
            <p>Số điện thoại: 0955696969</p>
            <p>Email: endervaigay@gmail.com</p>
          </div>
        </div>
        <div className='edit-information'>
          <button className='btn btn-info mt-3' style={{color:'white'}}>Sửa thông tin</button>
        </div>
      </div>
    </div>
  );
}
