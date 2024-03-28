import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const DeleteSalesWorkflow = (props: any) => {
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
      />
    </>
  );
};
