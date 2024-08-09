import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { DeleteSalesWorkflowI } from './DeleteSalesWorkflow.interface';

export const DeleteSalesWorkflow: React.FC<DeleteSalesWorkflowI> = (props) => {
  const { deleteWorkflow, setDeleteWorkflow, handleSubmit, loading } = props;
  return (
    <>
      <AlertModals
        open={deleteWorkflow}
        handleClose={() => setDeleteWorkflow(false)}
        message="Are you sure you want to delete workflow?"
        type={ALERT_MODALS_TYPE?.DELETE}
        handleSubmitBtn={handleSubmit}
        loading={loading}
        disableCancelBtn={loading}
      />
    </>
  );
};
