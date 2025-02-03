import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteWorkflows } from './useDeleteWorkflows';

export const DeleteWorkflows = (props: any) => {
  const { deleteWorkflow } = props;

  const { handleDelete, isLoading, closeModal } = useDeleteWorkflows(props);

  return (
    <>
      <AlertModals
        open={deleteWorkflow}
        handleClose={closeModal}
        message="cAre you sure you want to delete this item?"
        type={ALERT_MODALS_TYPE?.DELETE}
        handleSubmitBtn={handleDelete}
        loading={isLoading}
        disableCancelBtn={isLoading}
      />
    </>
  );
};
