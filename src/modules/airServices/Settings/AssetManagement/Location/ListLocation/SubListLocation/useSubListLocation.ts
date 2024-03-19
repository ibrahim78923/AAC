import { useDeleteChildLocationMutation } from '@/services/airServices/settings/asset-management/location';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useSubListLocation = () => {
  const theme: any = useTheme();
  const [showIcon, setShowIcon] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [deleteChildTrigger] = useDeleteChildLocationMutation();

  const handleDeleteSubmit = async (parentId: string, childId: string) => {
    try {
      await deleteChildTrigger({
        id: childId,
        parentId: parentId,
      }).unwrap();
      successSnackbar('Delete successfully');
      setIsOpenAlert(false);
    } catch (error: any) {
      errorSnackbar();
    }
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
