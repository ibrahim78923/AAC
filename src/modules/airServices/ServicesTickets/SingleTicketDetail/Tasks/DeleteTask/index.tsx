import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteTask } from './useDeleteTask';
import { TicketsTasksPortalComponentPropsI } from '../Tasks.interface';

export const DeleteTask = (props: TicketsTasksPortalComponentPropsI) => {
  const { isPortalOpen } = props;
  const { deleteTask, deleteTaskStatus, closeDeleteModal } =
    useDeleteTask(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete this task?"
      open={isPortalOpen?.isDelete as boolean}
      handleClose={() => closeDeleteModal?.()}
      handleSubmitBtn={() => deleteTask?.()}
      cancelBtnText="Cancel"
      loading={deleteTaskStatus?.isLoading}
      disableCancelBtn={deleteTaskStatus?.isLoading}
    />
  );
};
