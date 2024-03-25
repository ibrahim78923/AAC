import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const AgentConversionDelete = ({
  open,
  handleClose,
  message,
  submitDeleteModal,
  loading,
}: any) => {
  return (
    <>
      <AlertModals
        type={ALERT_MODALS_TYPE?.DELETE}
        message={message}
        open={open}
        loading={loading}
        handleClose={handleClose}
        handleSubmitBtn={() => {
          submitDeleteModal();
          handleClose();
        }}
      />
    </>
  );
};
