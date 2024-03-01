import { successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useSingleListLocation = () => {
  const theme: any = useTheme();
  const [showIcon, setShowIcon] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleDeleteSubmit = () => {
    successSnackbar('Delete successfully');
    setIsOpenAlert(false);
  };
  return {
    showIcon,
    setShowIcon,
    theme,
    isOpenAlert,
    setIsOpenAlert,
    handleDeleteSubmit,
  };
};
