import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDeleteSingleAttachmentMutation } from '@/services/airServices/tickets/attachments';

export const useDeleteAttachments = (props: any) => {
  const { deleteModal, setDeleteModal, getSingleAttachment } = props;

  const closeModal = () => {
    setDeleteModal({ open: false, id: '' });
  };

  const [deleteAttachmentTrigger, { isLoading }] =
    useDeleteSingleAttachmentMutation();

  const deleteAttachmentSubmit = async () => {
    const deleteSingleAttachmentParameter = {
      queryParams: {
        id: deleteModal?.id,
      },
    };

    try {
      await deleteAttachmentTrigger(deleteSingleAttachmentParameter)?.unwrap();
      successSnackbar('Attachment deleted successfully!');
      closeModal?.();
      await getSingleAttachment?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    isLoading,
    deleteAttachmentSubmit,
    closeModal,
  };
};
