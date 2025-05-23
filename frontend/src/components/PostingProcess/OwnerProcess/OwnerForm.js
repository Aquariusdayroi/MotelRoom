import { useEffect, useState } from 'react';
import AvatarUpload from './AvatarUpload';
import axiosClient from '../../../api/axiosClient';

function OwnerForm({ register, errors, setValue, watch }) {
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const res = await axiosClient.get('/city/api/get_all/');
                setCity(res.data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCity();
    }, []);

    const selectedCity = watch('province');

    useEffect(() => {
        if (!selectedCity) return;
        const fetchDistrict = async () => {
            try {
                const res = await axiosClient.get(`/district/api/by-city/${selectedCity}/`);
                setDistrict(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDistrict();
    }, [selectedCity]);

    return (
        <div className="row g-4 py-5">
            {/* Mã số giấy tờ */}
            <div className="col-md-6">
                <label className="form-label">Mã số trên giấy tờ</label>
                <span className="text-danger ms-1">*</span>
                <input
                    type="text"
                    className="form-control"
                    {...register('id_number', {
                        required: 'Không được để trống',
                        pattern: {
                            value: /^[0-9]{12}$/,
                            message: 'CCCD phải có 12 chữ số',
                        },
                    })}
                />
                {errors.id_number && <p className="text-danger mt-1 w-100">{errors.id_number.message}</p>}
            </div>

            {/* Họ và tên */}
            <div className="col-md-6">
                <label className="form-label">Họ và tên</label>
                <span className="text-danger ms-1">*</span>
                <input
                    type="text"
                    className="form-control"
                    {...register('full_name', {
                        required: 'Không được để trống',
                        pattern: {
                            value: /^\s*(\s{0,1}([A-ZÀ-Ỹ][A-Za-zÀ-Ỹà-ỹ]*))+\s*$/,
                            message:
                                'Họ tên phải viết hoa chữ cái đầu (VD: Nguyễn Văn A), giữa các từ cách nhau 1 khoảng trắng',
                        },
                    })}
                />
                {errors.full_name && <p className="text-danger mt-1 w-100">{errors.full_name.message}</p>}
            </div>

            {/* Ngày sinh */}
            <div className="col-md-6">
                <label className="form-label">Ngày sinh</label>
                <span className="text-danger ms-1">*</span>
                <input
                    type="date"
                    className="form-control"
                    {...register('dob', {
                        required: 'Không được để trống',
                        validate: (value) => {
                            const today = new Date();
                            const dob = new Date(value);
                            const age = today.getFullYear() - dob.getFullYear();
                            return age >= 18 || 'Bạn phải đủ 18 tuổi trở lên';
                        },
                    })}
                />
                {errors.dob && <p className="text-danger mt-1 w-100">{errors.dob.message}</p>}
            </div>

            {/* SĐT */}
            <div className="col-md-6">
                <label className="form-label">Số điện thoại liên lạc</label>
                <span className="text-danger ms-1">*</span>
                <input
                    type="text"
                    className="form-control"
                    {...register('phone', {
                        required: 'Không được để trống',
                        pattern: {
                            value: /^0([3|5|7|8|9])([0-9]{8})$/,
                            message: 'Số điện thoại không hợp lệ',
                        },
                    })}
                />
                {errors.phone && <p className="text-danger mt-1 w-100">{errors.phone.message}</p>}
            </div>

            <div className="col-md-12">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="row g-4">
                            {/* Tỉnh */}
                            <div className="col-md-6">
                                <label className="form-label">Tỉnh/Thành phố</label>
                                <select className="form-select" {...register('province')}>
                                    <option value="">-- Chọn --</option>
                                    {city?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name_city}
                                        </option>
                                    ))}
                                </select>
                                {errors.province && <p className="text-danger mt-1 w-100">{errors.province.message}</p>}
                            </div>

                            {/* Huyện */}
                            <div className="col-md-6">
                                <label className="form-label">Quận/Huyện</label>
                                <select className="form-select" {...register('district')}>
                                    <option value="">-- Chọn --</option>
                                    {district?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name_district}
                                        </option>
                                    ))}
                                </select>
                                {errors.district && <p className="text-danger mt-1 w-100">{errors.district.message}</p>}
                            </div>

                            {/* Địa chỉ */}
                            <div className="col-md-12">
                                <label className="form-label">Địa chỉ thường trú</label>
                                <input type="text" className="form-control" {...register('address')} />
                                {errors.address && <p className="text-danger mt-1 w-100">{errors.address.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Ảnh đại diện */}
                    <div className="col-md-6">
                        <AvatarUpload register={register} setValue={setValue} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OwnerForm;
