import { useContext, useState } from 'react';
import StepWrapper from '../components/PostingProcess/StepWrapper';
import Step1_Intro from '../components/PostingProcess/Step1/Step1_Intro';
import Step1_SelectType from '../components/PostingProcess/Step1/Step1_SelectType';
import Step1_AddressConfirm from '../components/PostingProcess/Step1/Step1_AddressConfirm';

import Step2_Intro from '../components/PostingProcess/Step2/Step2_Intro';
import Step2_UploadImage from '../components/PostingProcess/Step2/Step2_UploadImage';

import Step3_Intro from '../components/PostingProcess/Step3/Step3_Intro';
import Step3_Amenities from '../components/PostingProcess/Step3/Step3_Amenities';
import Step3_AdditionalAmenities from '../components/PostingProcess/Step3/Step3_AdditionalAmenities';
import Step3_TitleAndDescription from '../components/PostingProcess/Step3/Step3_TitleAndDescription';

import Step4_Intro from '../components/PostingProcess/Step4/Step4_Intro';
import Step4_ReviewAndSubmit from '../components/PostingProcess/Step4/Step4_ReviewAndSubmit';
import OwnerRegister from '../components/PostingProcess/OwnerProcess/OwnerRegister';

import { AuthToken } from '../authToken';
import OwnerReview from '../components/PostingProcess/OwnerProcess/OwnerReview';

const steps = [
    // Step1_Intro,
    // Step1_SelectType,
    // Step1_AddressConfirm,
    // Step2_Intro,
    // Step2_UploadImage,
    //Step3_Intro,Step3_Amenities, Step3_AdditionalAmenities, Step3_TitleAndDescription,
    // Step4_Intro,
    // Step4_ReviewAndSubmit,
    OwnerRegister,
    OwnerReview,
];

function AddPost() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        id: 1,
        user: {
            id: 1203,
            fullname: 'Nguyễn Quốc Dũng',
            avatar: '/media/avatars/default.jpg',
        },
        fullname: 'Nguyễn Quốc Dũng',
        avatar: '/media/avatars/default.jpg',
        home_type: 'Phòng trọ',
        title: 'PHÒNG MỚI XÂY NGAY THỐNG NHẤT BANCOL MÁY LẠNH',
        information_detail:
            'PHÒNG BANCOL MỚI XÂY NGAY PHƯỜNG 10 GÒ VẤP. ️ Đường Thống Nhất Phường 10 Gò Vấp. Giá chỉ từ 3.800.000 có máy lạnh. ️ Phòng mới xây mới, có bancol, cửa sổ trời. ️ Liên Hệ 0878.055.599 để được tư vấn',
        address: {
            id: 3581,
            description: 'đường thống nhất, phường 10, gò vấp, hồ chí minh',
            latitude: '10.833176',
            longitude: '106.663996',
        },
        total_occupancy: 1,
        acreage: '30.00',
        price: '3800000.00',
        create_at: '2025-05-11T16:36:01.657826Z',
        update_at: '2025-05-11T16:36:01.657839Z',
        images: [
            {
                id: 58816,
                image_url:
                    'http://localhost:8000/media/images/images_rentalpost/PH%C3%92NG_M%E1%BB%9AI_X%C3%82Y_NGAY_TH%E1%BB%90NG_NH%E1%BA%A4T_/img_1.jpg',
            },
            {
                id: 58817,
                image_url:
                    'http://localhost:8000/media/images/images_rentalpost/PH%C3%92NG_M%E1%BB%9AI_X%C3%82Y_NGAY_TH%E1%BB%90NG_NH%E1%BA%A4T_/img_2.jpg',
            },
            {
                id: 58818,
                image_url:
                    'http://localhost:8000/media/images/images_rentalpost/PH%C3%92NG_M%E1%BB%9AI_X%C3%82Y_NGAY_TH%E1%BB%90NG_NH%E1%BA%A4T_/img_3.jpg',
            },
            {
                id: 58819,
                image_url:
                    'http://localhost:8000/media/images/images_rentalpost/PH%C3%92NG_M%E1%BB%9AI_X%C3%82Y_NGAY_TH%E1%BB%90NG_NH%E1%BA%A4T_/img_4.jpg',
            },
            {
                id: 58820,
                image_url:
                    'http://localhost:8000/media/images/images_rentalpost/PH%C3%92NG_M%E1%BB%9AI_X%C3%82Y_NGAY_TH%E1%BB%90NG_NH%E1%BA%A4T_/img_5.jpg',
            },
            {
                id: 58821,
                image_url:
                    'http://localhost:8000/media/images/images_rentalpost/PH%C3%92NG_M%E1%BB%9AI_X%C3%82Y_NGAY_TH%E1%BB%90NG_NH%E1%BA%A4T_/img_6.jpg',
            },
        ],
        is_favorite: false,
        is_public: true,
        has_wifi: true,
        has_tv: true,
        has_kitchen: true,
        has_washing_machine: false,
        has_parking: false,
        has_fridge: true,
        has_air_conditioner: false,
        has_attic: true,
        has_water_heater: false,
        has_dehumidifier: false,
        has_hot_tub: false,
        has_balcony: true,
        has_elevator: false,
        has_microwave: true,
        has_security_camera: false,
        has_first_aid_kit: false,
        has_fingerprint_lock: false,
    });

    const headerHeight = 80;
    const containerHeight = `calc(100vh - ${headerHeight}px)`;

    let { user, role } = useContext(AuthToken);

    const StepComponent = steps[currentStep];

    const [direction, setDirection] = useState('next');
    const handleNext = (data) => {
        window.scrollTo(0, 0);
        setFormData({ ...formData, ...data });
        setCurrentStep((prev) => prev + 1);
        setDirection('next');
    };
    const handleBack = () => {
        window.scrollTo(0, 0);
        setCurrentStep((prev) => prev - 1);
        setDirection('prev');
    };

    const handleSubmit = () => {
        if (currentStep === steps.length - 1) {
            console.log(formData);
            return;
        }
        handleNext();
    };

    return (
        <div className="container" style={{ minHeight: containerHeight }}>
            <StepWrapper key={currentStep} stepKey={currentStep} direction={direction}>
                <div className="px-4">
                    <StepComponent data={formData} onNext={handleNext} onBack={handleBack} onSubmit={handleSubmit} />
                </div>
            </StepWrapper>
        </div>
    );
}

export default AddPost;
