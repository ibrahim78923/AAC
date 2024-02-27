import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useWorkloadScheduleDelete } from './useWorkloadScheduleDelete';
export const WorkloadScheduleDelete = (props: any) => {
  const { openDeleteModal } = props;
  const {
    deleteWorkloadSchedule,
    closeWorkloadScheduleDeleteModal,
    deleteWorkloadScheduleStatus,
  } = useWorkloadScheduleDelete(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete this workLoad schedule?"
      open={openDeleteModal}
      handleClose={() => closeWorkloadScheduleDeleteModal()}
      handleSubmitBtn={() => {
        deleteWorkloadSchedule();
      }}
      disableCancelBtn={deleteWorkloadScheduleStatus?.isLoading}
      loading={deleteWorkloadScheduleStatus?.isLoading}
    />
  );
};
