import { useDeleteParentLocationMutation } from '@/services/airServices/settings/asset-management/location';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useSingleListLocation = (props: any) => {
  const { parentId } = props;
  const theme: any = useTheme();
  const [showIcon, setShowIcon] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [deleteParentTrigger] = useDeleteParentLocationMutation();
  const handleDeleteSubmit = async () => {
    try {
      const param = {
        id: parentId,
      };
      await deleteParentTrigger(param)?.unwrap();
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
