import { useDeleteAirServicesSettingsWorkloadScheduleMutation } from '@/services/airServices/settings/agent-performance-management/workload-management/workload-schedule';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useWorkloadScheduleDelete = (props: any) => {
  const {
    setOpenDeleteModal,
    selectWorkloadSchedule,
    setSelectWorkloadSchedule,
  } = props;

  const [deleteWorkloadScheduleTrigger, deleteWorkloadScheduleStatus] =
    useDeleteAirServicesSettingsWorkloadScheduleMutation();

  const deleteWorkloadSchedule = async () => {
    const deleteArticlesParameter = {
      queryParams: {
        id: selectWorkloadSchedule,
      },
    };
    try {
      await deleteWorkloadScheduleTrigger(deleteArticlesParameter)?.unwrap();
      successSnackbar('Workload Schedule deleted successfully');
      setSelectWorkloadSchedule?.('');
      closeWorkloadScheduleDeleteModal?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
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
