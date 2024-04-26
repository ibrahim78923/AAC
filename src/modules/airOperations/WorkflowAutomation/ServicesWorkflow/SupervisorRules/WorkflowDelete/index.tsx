import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';

export const WorkflowDelete = (props: any) => {
  const { deleteWorkflow, setDeleteWorkflow, deleteStatus } = props;
  return (
    <>
      <AlertModals
        open={deleteWorkflow}
        handleClose={() => setDeleteWorkflow(false)}
        message="Are you sure you want to delete this item?"
        type={ALERT_MODALS_TYPE?.DELETE}
        handleSubmitBtn={() => {
          successSnackbar('Workflow deleted successfully');
          setDeleteWorkflow(false);
        }}
        loading={deleteStatus?.isLoading}
        disableCancelBtn={deleteStatus?.isLoading}
      />
    </>
  );
};
