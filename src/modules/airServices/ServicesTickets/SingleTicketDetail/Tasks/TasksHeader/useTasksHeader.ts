import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { EXPORT_FILE_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteTaskMutation } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { downloadFile } from '@/utils/file';

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
  const [deleteTaskApi] = useDeleteTaskMutation();
  const submitDeleteModel = async () => {
    const deleteParams = new URLSearchParams();
    activeCheck?.forEach((task: any) => deleteParams?.append('ids', task?._id));
    try {
      const res: any = await deleteTaskApi(deleteParams);
      enqueueSnackbar(res?.data?.message && 'Task Delete Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setDeleteModal(false);
      setActionPop(null);
      setActiveCheck([]);
    } catch (error: any) {
      enqueueSnackbar(error?.error?.message ?? 'An error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const excelExportHandler = async () => {
    try {
      const file: any = await downloadFile(
        activeCheck || [],
        'excel-export.xlsx',
        EXPORT_FILE_TYPE?.XLS,
      );
      enqueueSnackbar(file?.data?.message ?? 'XLS File Download successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setActionPop(null);
      setActionExportPop(null);
    } catch (error: any) {
      enqueueSnackbar(error?.error?.message ?? 'Error exporting XLS file ', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const csvExportHandler = async () => {
    try {
      const file: any = await downloadFile(
        activeCheck || [],
        'csv-export.csv',
        EXPORT_FILE_TYPE?.CSV,
      );
      enqueueSnackbar(file?.data?.message ?? 'CSV File Download Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setActionPop(null);
      setActionExportPop(null);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error exporting CSV file', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
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
    excelExportHandler,
    csvExportHandler,
  };
};
