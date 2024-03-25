import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const EventBasedWorkflowDelete = (props: any) => {
  const { deleteWorkflow, setDeleteWorkflow, handleDelete } = props;
  return (
    <>
      <AlertModals
        open={deleteWorkflow}
        handleClose={() => setDeleteWorkflow(false)}
        message="Are you sure you want to delete this item?"
        type={ALERT_MODALS_TYPE?.DELETE}
        handleSubmitBtn={handleDelete}
      />
    </>
  );
};
