import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const EventBasedWorkflowDelete: React.FC<{
  deleteWorkflow: boolean;
  setDeleteWorkflow: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  deleteStatus: any;
}> = (props) => {
  const { deleteWorkflow, setDeleteWorkflow, handleDelete, deleteStatus } =
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
