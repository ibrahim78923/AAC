import { useState } from 'react';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

export const useTasks = () => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState<number>(0);
  const [activeCheck, setActiveCheck] = useState<any>([]);
  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);
  const [actionExportPop, setActionExportPop] =
    useState<HTMLButtonElement | null>(null);
  const [drawerStatusVal, setDrawerStatusVal] = useState(null);
  const [drawerStatusPop, setDrawerStatusPop] =
    useState<HTMLButtonElement | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionPop(event.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);

  const handleActionExportClick = (event: any) => {
    setActionExportPop(event.currentTarget);
  };
  const handleActionExportClose = () => {
    setActionExportPop(null);
  };
  const openActionExport = Boolean(actionExportPop);
  const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDrawerStatusPop(event.currentTarget);
  };
  const handleStatusClose = () => {
    setDrawerStatusPop(null);
  };
  const openDrawerStatus = Boolean(drawerStatusPop);
  const handleStatusItemClick = (selectedStatus: any) => {
    setDrawerStatusVal(selectedStatus);
    setDrawerStatusPop(null);
  };
  const submitDeleteModel = async () => {
    enqueueSnackbar('Task Delete Successfully', {
      variant: 'error',
    });
    setDeleteModal(false);
    setActionPop(null);
  };
  const theme = useTheme();
  return {
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    activeCheck,
    setActiveCheck,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    actionPop,
    setActionPop,
    handleActionClick,
    handleActionClose,
    openAction,
    actionExportPop,
    setActionExportPop,
    handleActionExportClick,
    handleActionExportClose,
    openActionExport,
    drawerStatusVal,
    setDrawerStatusVal,
    drawerStatusPop,
    setDrawerStatusPop,
    handleStatusClick,
    handleStatusClose,
    openDrawerStatus,
    handleStatusItemClick,
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    theme,
  };
};
