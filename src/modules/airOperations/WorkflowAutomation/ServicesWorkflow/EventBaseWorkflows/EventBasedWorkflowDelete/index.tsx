import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

export const EventBasedWorkflowDelete = (props: any) => {
  const { deleteWorkflow, setDeleteWorkflow } = props;
  return (
    <>
      <AlertModals
        open={deleteWorkflow}
        handleClose={() => setDeleteWorkflow(false)}
        message="Are you sure you want to delete this item?"
        type={ALERT_MODALS_TYPE?.DELETE}
        handleSubmitBtn={() => {
          enqueueSnackbar('Workflow deleted successfully', {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
          setDeleteWorkflow(false);
        }}
      />
    </>
  );
};
