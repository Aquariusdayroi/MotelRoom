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
import axiosClient from '../api/axiosClient';

const steps = [
    Step1_Intro,
    Step1_SelectType,
    Step1_AddressConfirm,
    Step2_Intro,
    Step2_UploadImage,
    Step3_Intro,
    Step3_Amenities,
    Step3_AdditionalAmenities,
    Step3_TitleAndDescription,
    Step4_Intro,
    Step4_ReviewAndSubmit,
    OwnerRegister,
    OwnerReview,
];

function AddPost() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});

    const headerHeight = 80;
    const containerHeight = `calc(100vh - ${headerHeight}px)`;

    const { user, role } = useContext(AuthToken);

    const StepComponent = steps[currentStep];

    const [direction, setDirection] = useState('next');

    const handleSetData = (data) => {
        if (!data) return;
        setFormData((prev) => ({ ...prev, ...data }));
        console.log('form-data:', { ...formData, ...data });
    };

    const handleNext = (data = {}) => {
        window.scrollTo(0, 0);
        setCurrentStep((prev) => prev + 1);
        setDirection('next');
        handleSetData(data);
    };

    const handleBack = (data = {}) => {
        window.scrollTo(0, 0);
        setCurrentStep((prev) => prev - 1);
        setDirection('prev');
        handleSetData(data);
    };

    const requestOwner = async (data) => {
        try {
            const res = await axiosClient.post('/user/api/owner-requests/send-request/', data);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (data = {}) => {
        if (data.home_type) {
            if (role !== 'user') {
                console.log('submit');
            }
            handleNext({ post_data: data });
        }

        if (data.cccd) {
            const { user, images_rental_post, images, ...rest } = formData.post_data;
            const final_data = {
                ...data,
                rental_post_data: rest,
                images_rental_post: images_rental_post,
            };
            await requestOwner(final_data);

            handleNext({ owner: data });
        }
    };

    return (
        <div className="container" style={{ minHeight: containerHeight }}>
            <StepWrapper key={currentStep} stepKey={currentStep} direction={direction}>
                <div className="px-5">
                    <StepComponent data={formData} onNext={handleNext} onBack={handleBack} onSubmit={handleSubmit} />
                </div>
            </StepWrapper>
        </div>
    );
}

export default AddPost;
