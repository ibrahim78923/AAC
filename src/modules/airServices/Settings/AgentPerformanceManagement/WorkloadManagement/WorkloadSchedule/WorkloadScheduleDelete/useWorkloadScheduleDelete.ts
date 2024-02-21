import { useDeleteWorkloadScheduleMutation } from '@/services/airServices/settings/agent-performance-management/workload-management/workload-schedule';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useWorkloadScheduleDelete = (props: any) => {
  const {
    setOpenDeleteModal,
    setPage,
    selectWorkloadSchedule,
    setSelectWorkloadSchedule,
  } = props;

  const [deleteWorkloadScheduleTrigger, deleteWorkloadScheduleStatus] =
    useDeleteWorkloadScheduleMutation();

  const deleteWorkloadSchedule = async () => {
    const deleteArticlesParameter = {
      queryParams: {
        id: selectWorkloadSchedule,
      },
    };
    try {
      await deleteWorkloadScheduleTrigger(deleteArticlesParameter)?.unwrap();
      successSnackbar('Workload Schedule deleted successfully');
      setPage?.(1);
      setSelectWorkloadSchedule?.('');
      closeWorkloadScheduleDeleteModal?.();
    } catch (error: any) {
      errorSnackbar?.();
      setSelectWorkloadSchedule?.('');
      closeWorkloadScheduleDeleteModal?.();
    }
  };
  const closeWorkloadScheduleDeleteModal = () => {
    setOpenDeleteModal?.(false);
  };

  return {
    deleteWorkloadSchedule,
    closeWorkloadScheduleDeleteModal,
    deleteWorkloadScheduleStatus,
  };
};
