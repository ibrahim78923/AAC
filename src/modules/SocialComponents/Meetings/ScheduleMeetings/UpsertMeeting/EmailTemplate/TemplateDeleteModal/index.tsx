import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { DeleteListViewI } from './TemplateDeleteModal.interface';

export const TemplateDeleteModal = ({
  open,
  handleClose,
  message,
  submitDeleteModal,
  deleteMeetingsStatus,
}: DeleteListViewI) => {
  return (
    <>
      <AlertModals
        type={ALERT_MODALS_TYPE?.DELETE}
        message={message}
        open={open}
        handleClose={handleClose}
        handleSubmitBtn={() => {
          submitDeleteModal();
        }}
        loading={deleteMeetingsStatus?.isLoading}
        disableCancelBtn={deleteMeetingsStatus?.isLoading}
      />
    </>
  );
};
