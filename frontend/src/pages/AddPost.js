import { useState } from 'react';
import StepWrapper from '../components/PostingProcess/StepWrapper';
import Step1_Intro from '../components/PostingProcess/Step1/Step1_Intro';
import Step1_SelectType from '../components/PostingProcess/Step1/Step1_SelectType';
import Step1_AddressConfirm from '../components/PostingProcess/Step1/Step1_AddressConfirm'

import Step2_Intro from '../components/PostingProcess/Step2/Step2_Intro'
import Step2_UploadImage from '../components/PostingProcess/Step2/Step2_UploadImage';
import Step3_ReviewAndSubmit from '../components/PostingProcess/Step3/Step3_ReviewAndSubmit';

const steps = [Step1_Intro, Step1_SelectType, Step1_AddressConfirm,Step2_Intro, Step2_UploadImage, Step3_ReviewAndSubmit];

function AddPost() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});

    const StepComponent = steps[currentStep];

    const [direction, setDirection] = useState('next');
    const handleNext = (data) => {
        setFormData({ ...formData, ...data });
        setCurrentStep((prev) => prev + 1);
        setDirection('next');
    };
    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
        setDirection('prev');
    };

    const handleSubmit = () => {
        console.log('Dữ liệu gửi đi:', formData);
    };

    return (
        <div className="container py-4">
            <StepWrapper key={currentStep} stepKey={currentStep} direction={direction}>
                <StepComponent data={formData} onNext={handleNext} onBack={handleBack} onSubmit={handleSubmit} />
            </StepWrapper>
        </div>
    );
}

export default AddPost;
