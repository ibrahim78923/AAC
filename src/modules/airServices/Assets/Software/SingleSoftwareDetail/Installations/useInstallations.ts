import { useState } from 'react';
import { useInstallationI } from './Installation.interface';
import { enqueueSnackbar } from 'notistack';

export const useInstallation = (): useInstallationI => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState<number>(0);
  const [activeCheck, setActiveCheck] = useState<any>([]);
  const [exportPop, setExportPop] = useState<HTMLButtonElement | null>(null);
  const [actionExportPop, setActionExportPop] =
    useState<HTMLButtonElement | null>(null);
  const [drawerStatusVal, setDrawerStatusVal] = useState(null);
  const [drawerStatusPop, setDrawerStatusPop] =
    useState<HTMLButtonElement | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportPop(event.currentTarget);
  };
  const handleExportClose = () => {
    setExportPop(null);
  };
  const openExport = Boolean(exportPop);
  const handleMenuExport = () => {
    enqueueSnackbar('File export successfully', {
      variant: 'success',
    });
    setExportPop(null);
  };
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
    enqueueSnackbar('Device Removed Successfully', {
      variant: 'success',
    });
    setDeleteModal(false);
  };
  return {
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    isDetailDrawerOpen,
    setIsDetailDrawerOpen,
    activeCheck,
    setActiveCheck,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    exportPop,
    setExportPop,
    handleExportClick,
    handleExportClose,
    openExport,
    handleMenuExport,
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
  };
};
