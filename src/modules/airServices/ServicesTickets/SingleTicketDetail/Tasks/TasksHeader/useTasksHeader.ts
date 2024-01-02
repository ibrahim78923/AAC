import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useTasksHeader = (props: any) => {
  const {
    activeCheck,
    setIsEditDrawerOpen,
    setIsAddDrawerOpen,
    setActiveCheck,
  } = props;
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
  const openEditDrawer = () => {
    if (activeCheck?.length > 1) {
      enqueueSnackbar('Cannot edit multiple tasks', {
        variant: NOTISTACK_VARIANTS?.WARNING,
      });
    } else {
      setIsEditDrawerOpen(true);
      setActionPop(null);
    }
  };
  const openAddDrawer = () => {
    setActiveCheck([]);
    setIsAddDrawerOpen(true);
  };
  return {
    actionPop,
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
    openEditDrawer,
    openAddDrawer,
  };
};
