import { useState } from 'react';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

export const useTasksHeader = () => {
  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);
  const [actionExportPop, setActionExportPop] =
    useState<HTMLButtonElement | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionPop(event?.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);

  const handleActionExportClick = (event: any) => {
    setActionExportPop(event?.currentTarget);
  };
  const handleActionExportClose = () => {
    setActionExportPop(null);
  };
  const openActionExport = Boolean(actionExportPop);
  const submitDeleteModel = async () => {
    enqueueSnackbar('Task Delete Successfully', {
      variant: 'error',
    });
    setDeleteModal(false);
    setActionPop(null);
  };
  const theme = useTheme();
  return {
    actionPop,
    setActionPop,
    openAction,
    handleActionClick,
    handleActionClose,
    actionExportPop,
    openActionExport,
    handleActionExportClick,
    handleActionExportClose,
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    theme,
  };
};
