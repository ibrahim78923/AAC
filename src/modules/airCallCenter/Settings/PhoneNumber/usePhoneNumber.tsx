import { useTheme } from '@mui/material';
import { useState } from 'react';

const usePhoneNumber = () => {
  const theme = useTheme();
  const [isBuyNewNumber, setIsBuyNewNumber] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditNumberDrawer, setIsEditNumberDrawer] = useState(false);

  return {
    theme,
    isBuyNewNumber,
    setIsBuyNewNumber,
    isDeleteModal,
    setIsDeleteModal,
    isEditNumberDrawer,
    setIsEditNumberDrawer,
  };
};

export default usePhoneNumber;
