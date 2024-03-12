import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteTaskMutation } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { errorSnackbar, successSnackbar } from '@/utils/api';

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
  const handleActionExportClose = (event: React.MouseEvent<HTMLElement>) => {
    event?.stopPropagation();
    setActionExportPop(null);
  };
  const openActionExport = Boolean(actionExportPop);
  const [deleteTaskApi, { isLoading }] = useDeleteTaskMutation();
  const submitDeleteModel = async () => {
    const deleteParams = activeCheck?.map((task: any) => task?._id);
    try {
      const res: any = await deleteTaskApi(deleteParams);
      successSnackbar(res?.data?.message && 'Task Delete Successfully');
      setDeleteModal(false);
      setActionPop(null);
      setActiveCheck([]);
    } catch (error: any) {
      errorSnackbar(error?.error?.message ?? 'An error occurred');
    }
  };
  const exportHandler = async (
    type: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    event.stopPropagation();
    successSnackbar(`${type} Task file export successfully`);
    setActionExportPop(null);
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
    exportHandler,
    isLoading,
  };
};
