import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const WorkflowDelete = (props: any) => {
  const { deleteWorkflow, setDeleteWorkflow, deleteStatus, handleDelete } =
    props;
  return (
    <>
      <AlertModals
        open={deleteWorkflow}
        handleClose={() => setDeleteWorkflow(false)}
        message="Are you sure you want to delete this item?"
        type={ALERT_MODALS_TYPE?.DELETE}
        handleSubmitBtn={handleDelete}
        loading={deleteStatus?.isLoading}
        disableCancelBtn={deleteStatus?.isLoading}
      />
    </>
  );
};
