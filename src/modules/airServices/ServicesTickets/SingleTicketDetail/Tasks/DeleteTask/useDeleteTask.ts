import { useDeleteTaskMutation } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { TicketsTasksPortalComponentPropsI } from '../Tasks.interface';

export const useDeleteTask = (props: TicketsTasksPortalComponentPropsI) => {
  const {
    setIsPortalOpen,
    selectedTasksList,
    setSelectedTasksLists,
    setPage,
    totalRecords,
    page,
    getTaskListData,
  } = props;

  const [deleteTaskTrigger, deleteTaskStatus] = useDeleteTaskMutation();

  const deleteTask = async () => {
    const deleteParams = new URLSearchParams();

    selectedTasksList?.forEach(
      (taskId: any) => deleteParams?.append('ids', taskId?._id),
    );

    const deleteTaskParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteTaskTrigger(deleteTaskParameter)?.unwrap();
      successSnackbar('Task delete successfully');
      closeDeleteModal?.();
      const newPage = selectedTasksList?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getTaskListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    setSelectedTasksLists?.([]);
    setIsPortalOpen?.({});
  };

  return {
    deleteTask,
    deleteTaskStatus,
    closeDeleteModal,
  };
};
