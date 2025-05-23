import { useForm } from 'react-hook-form';
import CCCDUpload from './CCCDUpload';
import OwnerForm from './OwnerForm';
import { useContext, useEffect } from 'react';
import { AuthToken } from '../../../authToken';

function OwnerRegister({ data: postData, onBack, onNext, onSubmit }) {
    const { userInfo } = useContext(AuthToken);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (userInfo) {
            reset({
                full_name: userInfo.fullname || '',
            });
        }
    }, [userInfo, reset]);

    const handleSubmitOwner = (data) => {
        const owner = {
            cccd: data.id_number,
            // get path from image
            image_front_cccd: data.frontCCCD,
            image_back_cccd: data.backCCCD,
        };

        onSubmit(owner);
    };

    return (
        <div className="py-5">
            <form onSubmit={handleSubmit(handleSubmitOwner)}>
                <h3 className="fw-bold mb-5">Thêm giấy tờ và hoàn thiện hồ sơ của bạn</h3>
                <CCCDUpload register={register} setValue={setValue} errors={errors} />
                <OwnerForm register={register} setValue={setValue} errors={errors} watch={watch} />

                <div className="d-flex aling-items-center justify-content-between my-5">
                    <button className="back-btn" onClick={() => onBack({})}>
                        <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>➔</span> Quay lại
                    </button>
                    <button type="submit" className="next-btn">
                        Gửi yêu cầu
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OwnerRegister;
