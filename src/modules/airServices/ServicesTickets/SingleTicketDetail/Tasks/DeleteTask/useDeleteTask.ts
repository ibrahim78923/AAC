import { useDeleteServicesTicketTaskMutation } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { useGetTicketTasksList } from '../../../TicketsServicesHooks/useGetTicketTasksList';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { PAGINATION } from '@/config';
import {
  emptySelectedTicketTasksLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/tickets-tasks/slice';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useDeleteTask = () => {
  const [deleteTaskTrigger, deleteTaskStatus] =
    useDeleteServicesTicketTaskMutation();

  const { getTicketTasksListData, page } = useGetTicketTasksList();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketTasks?.isPortalOpen,
  );

  const selectedTicketTasksLists = useAppSelector(
    (state) => state?.servicesTicketTasks?.selectedTicketTasksLists,
  );

  const totalRecords = useAppSelector(
    (state) => state?.servicesTicketTasks?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      selectedTicketTasksLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getTicketTasksListData?.();
  };

  const deleteTask = async () => {
    const deleteParams = new URLSearchParams();

    selectedTicketTasksLists?.forEach(
      (taskId: { _id: string }) => deleteParams?.append('ids', taskId?._id),
    );

    const deleteTaskParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteTaskTrigger(deleteTaskParameter)?.unwrap();
      successSnackbar('Task delete successfully');
      closeDeleteModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    dispatch(emptySelectedTicketTasksLists());
    dispatch(setIsPortalClose());
  };

  return {
    deleteTask,
    deleteTaskStatus,
    closeDeleteModal,
    isPortalOpen,
  };
};
