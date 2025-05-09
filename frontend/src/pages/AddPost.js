import { useState } from 'react';
import StepWrapper from '../components/PostingProcess/StepWrapper';
import Step1_SelectType from '../components/PostingProcess/Step1_SelectType';
import Step2_UploadImages from '../components/PostingProcess/Step2_UploadImages';
import Step3_ReviewAndSubmit from '../components/PostingProcess/Step3_ReviewAndSubmit';

const steps = [Step1_SelectType, Step2_UploadImages, Step3_ReviewAndSubmit];

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
            <StepWrapper key={currentStep} direction={direction}>
                <StepComponent data={formData} onNext={handleNext} onBack={handleBack} onSubmit={handleSubmit} />
            </StepWrapper>
        </div>
    );
}

export default AddPost;
