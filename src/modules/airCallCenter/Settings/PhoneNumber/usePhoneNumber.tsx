import { useTheme } from '@mui/material';
import { useState } from 'react';

const usePhoneNumber = () => {
  const theme = useTheme();
  const [isBuyNewNumber, setIsBuyNewNumber] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditNumberDrawer, setIsEditNumberDrawer] = useState(false);
  const [isTestConnectionModal, setIsTestConnectionModal] = useState(false);

  return {
    theme,
    isBuyNewNumber,
    setIsBuyNewNumber,
    isDeleteModal,
    setIsDeleteModal,
    isEditNumberDrawer,
    setIsEditNumberDrawer,
    isTestConnectionModal,
    setIsTestConnectionModal,
  };
};

export default usePhoneNumber;
