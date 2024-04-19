import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const AgentConversionDelete = ({
  open,
  handleClose,
  message,
  submitDeleteModal,
  deleteStatus,
}: any) => {
  return (
    <>
      <AlertModals
        type={ALERT_MODALS_TYPE?.DELETE}
        message={message}
        open={open}
        disabled={deleteStatus?.isLoading}
        handleClose={handleClose}
        loading={deleteStatus?.isLoading}
        handleSubmitBtn={() => {
          submitDeleteModal();
        }}
      />
    </>
  );
};
