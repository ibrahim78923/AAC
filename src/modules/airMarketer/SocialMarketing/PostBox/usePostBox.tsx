import { useState } from 'react';

const usePostBox = () => {
  const [isPostModal, setIsPostModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPost, setSelectedPost] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePostBox = () => {
    setIsPostModal(!isPostModal);
  };

  return {
    isPostModal,
    handlePostBox,
    handleReset,
    handleBack,
    handleNext,
    activeStep,
    setSelectedPost,
    selectedPost,
  };
};

export default usePostBox;
