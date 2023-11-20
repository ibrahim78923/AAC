import { useState } from 'react';

const usePostBox = () => {
  const [isPostModal, setIsPostModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPost, setSelectedPost] = useState({});
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
  const handleSubmit = () => {
    setIsDeleteModal(!isDeleteModal);
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
    handleClick,
    handleClose,
    open,
    anchorEl,
    isDeleteModal,
    handleSubmit,
  };
};

export default usePostBox;
