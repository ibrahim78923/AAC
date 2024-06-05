import { successSnackbar } from '@/utils/api';
import { useState } from 'react';

export const useNetworkWarningLogs = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setOpenConfirmModal(true);
    } else {
      setIsChecked(true);
      successSnackbar('Success, your changes have been saved');
    }
  };

  return {
    isChecked,
    handleCheckboxChange,
    openConfirmModal,
    setOpenConfirmModal,
    setIsChecked,
  };
};
