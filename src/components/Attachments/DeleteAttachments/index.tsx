import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteAttachments } from './useDeleteAttachments';

const DeleteAttachments = (props: any) => {
  const { deleteModal } = props;

  const { isLoading, deleteAttachmentSubmit, closeModal } =
    useDeleteAttachments(props);

  return (
    <AlertModals
      message={'Are you sure you want to delete attachment file?'}
      type={ALERT_MODALS_TYPE?.DELETE}
      open={deleteModal?.open}
      handleClose={closeModal}
      handleSubmitBtn={deleteAttachmentSubmit}
      loading={isLoading}
      disableCancelBtn={isLoading}
    />
  );
};

export default DeleteAttachments;
