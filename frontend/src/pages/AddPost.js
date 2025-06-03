import { useContext, useEffect, useState } from "react";
import StepWrapper from "../components/PostingProcess/StepWrapper";
import Step1_Intro from "../components/PostingProcess/Step1/Step1_Intro";
import Step1_SelectType from "../components/PostingProcess/Step1/Step1_SelectType";
import Step1_AddressConfirm from "../components/PostingProcess/Step1/Step1_AddressConfirm";

import Step2_Intro from "../components/PostingProcess/Step2/Step2_Intro";
import Step2_UploadImage from "../components/PostingProcess/Step2/Step2_UploadImage";

import Step3_Intro from "../components/PostingProcess/Step3/Step3_Intro";
import Step3_Amenities from "../components/PostingProcess/Step3/Step3_Amenities";
import Step3_AdditionalAmenities from "../components/PostingProcess/Step3/Step3_AdditionalAmenities";
import Step3_TitleAndDescription from "../components/PostingProcess/Step3/Step3_TitleAndDescription";

import Step4_Intro from "../components/PostingProcess/Step4/Step4_Intro";
import Step4_ReviewAndSubmit from "../components/PostingProcess/Step4/Step4_ReviewAndSubmit";
import OwnerRegister from "../components/PostingProcess/OwnerProcess/OwnerRegister";

import { AuthToken } from "../authToken";
import OwnerReview from "../components/PostingProcess/OwnerProcess/OwnerReview";
import axiosClient from "../api/axiosClient";

import UniversalModal from "../components/modal/UniversalModal";
import { useNavigate } from "react-router-dom";

function InitStep() {
  return <></>;
}

const ownerSteps = [
  InitStep,
  Step1_SelectType,
  Step1_AddressConfirm,

  Step2_UploadImage,

  Step3_Amenities,
  Step3_AdditionalAmenities,
  Step3_TitleAndDescription,

  Step4_ReviewAndSubmit,
];

const userSteps = [
  InitStep,
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
  const [status, setStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");

  const navigate = useNavigate();

  const { role } = useContext(AuthToken);

  const steps = role === "user" ? userSteps : ownerSteps;

  useEffect(() => {
    if (role !== "user") {
      setCurrentStep(1);
      return;
    }
    const getMyRequest = async () => {
      try {
        const res = await axiosClient.get(
          "/user/api/owner-requests/my_request/"
        );
        if (res.data.success && res.data.status === "pending") {
          setStatus("pending");
          setCurrentStep(steps.length - 1);
        } else setCurrentStep(1);
      } catch (error) {
        console.error(error);
        setCurrentStep(1);
      }
    };
    getMyRequest();
  }, [steps.length, role]);

  const headerHeight = 80;
  const containerHeight = `calc(100vh - ${headerHeight}px)`;

  const StepComponent = steps[currentStep];

  const [direction, setDirection] = useState("next");

  const handleSetData = (data) => {
    if (!data) return;
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = (data = {}) => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => prev + 1);
    setDirection("next");
    handleSetData(data);
  };

  const handleBack = (data = {}) => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => prev - 1);
    setDirection("prev");
    handleSetData(data);
  };

  const requestOwner = async (data) => {
    try {
      const sendData = new FormData();
      sendData.append(
        "rental_post_data",
        JSON.stringify(data.rental_post_data)
      );
      data.images_rental_post.forEach((file) =>
        sendData.append("images_rental_post", file)
      );
      sendData.append("cccd", data.cccd);
      sendData.append("image_front_cccd", data.image_front_cccd);
      sendData.append("image_back_cccd", data.image_back_cccd);

      const profileUpdate = new FormData();
      profileUpdate.append("fullname", data.fullname);
      profileUpdate.append("phone_number", data.phone_number);
      profileUpdate.append("address_name", data.address_name);
      profileUpdate.append("district_name", data.district_name);
      profileUpdate.append("city_name", data.city_name);
      profileUpdate.append("avatar", data.avatar);
      profileUpdate.append("birthday", data.birthday);

      await Promise.all([
        axiosClient.post("/user/api/owner-requests/send-request/", sendData),
        axiosClient.put("/user/api/me", profileUpdate),
      ]);

      return true;
    } catch {
      return false;
    }
  };

  const requestPost = async (data) => {
    try {
      const sendData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        sendData.append(key, value)
      );
      data.images.forEach((file) => sendData.append("images", file));

      const res = await axiosClient.post(
        "/rental_post/api/my-posts/",
        sendData
      );

      setModalType("success");
      setModalMessage(res.data.message);
      setModalOpen(true);
    } catch (error) {
      setModalType("error");
      setModalMessage(error.response.data.message);
      setModalOpen(true);
    }
  };

  const handleSubmit = async (data = {}) => {
    if (data.home_type) {
      if (role !== "user") {
        const { user, home_type, images_rental_post, images, ...rest } = data;
        const final_data = {
          ...rest,
          images: images_rental_post,
          home_type: home_type.toLowerCase(),
          description: rest.address.description,
          city: rest.address.city,
          district: rest.address.district,

          latitude: rest.address.latitude,
          longitude: rest.address.longitude,
        };
        console.log(final_data);
        await requestPost(final_data);

        return;
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
      const res = await requestOwner(final_data);

      if (!res) {
        setModalType("error");
        setModalMessage("Đã xảy ra lỗi, vui lòng thử lại.");
        setModalOpen(true);
        return;
      }

      handleNext({ owner: data });
    }
  };

  const handleCloseModal = () => {
    if (modalType === "success") {
      navigate("/profile");
      return;
    }

    setModalOpen(false);
    setModalMessage("");
  };

  return (
    <>
      <div className="container" style={{ minHeight: containerHeight }}>
        <StepWrapper
          key={currentStep}
          stepKey={currentStep}
          direction={direction}
        >
          <div className="px-5">
            <StepComponent
              data={formData}
              onNext={handleNext}
              onBack={handleBack}
              onSubmit={handleSubmit}
              status={status}
            />
          </div>
        </StepWrapper>
      </div>

      <UniversalModal
        show={modalOpen}
        message={modalMessage}
        type={modalType}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default AddPost;
