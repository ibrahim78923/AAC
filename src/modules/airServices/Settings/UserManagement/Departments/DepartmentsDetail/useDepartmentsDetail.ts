import { useState } from 'react';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useDepartmentsDetail = () => {
  const [actionPop, setActionPop] = useState<HTMLElement | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionPop(event?.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  const handleDeleteSubmit = () => {
    enqueueSnackbar('Department Deleted', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setOpenDelete(false);
    setActionPop(null);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setActionPop(null);
  };
  const theme: any = useTheme();
  return {
    theme,
    actionPop,
    handleActionClick,
    handleActionClose,
    openAction,
    openDelete,
    setOpenDelete,
    handleDeleteSubmit,
    handleDeleteClose,
  };
};
