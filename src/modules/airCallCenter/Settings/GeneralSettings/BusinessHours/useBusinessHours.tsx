import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
// import { yupResolver } from '@hookform/resolvers/yup';

const useBusinessHours = () => {
  // Disabled Business Hours Modal
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const handleOpenAlertModal = () => {
    setOpenAlertModal(true);
  };
  const handleCloseAlertModal = () => {
    setOpenAlertModal(false);
  };

  // Enabled Business Hours
  const [isEnabledBusinessHours, setIsEnabledBusinessHours] = useState(false);
  const handleEnabledBusinessHours = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = event.target.checked;
    setIsEnabledBusinessHours(isChecked);
    if (isChecked) {
      enqueueSnackbar('Business Hours enabled successfully', {
        variant: 'success',
      });
    }
    if (!isChecked) {
      handleOpenAlertModal();
    }
  };

  const handleDisabledBusinessHours = () => {
    setIsEnabledBusinessHours(false);
  };

  return {
    isEnabledBusinessHours,
    handleEnabledBusinessHours,
    openAlertModal,
    handleOpenAlertModal,
    handleCloseAlertModal,
    handleDisabledBusinessHours,
  };
};

export default useBusinessHours;
