import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';
import useDeleteEnquiry from './useDeleteEnquiry';

export const DeleteEnquiry = ({ isModalOpen, onClose }: any) => {
  const { deleteEnquiry, deleteEnquiriesStatus } = useDeleteEnquiry({
    isModalOpen,
    onClose,
  });

  return (
    <AlertModals
      type="delete"
      typeImage={<AlertModalDeleteIcon />}
      message="Are you sure you want to delete the selected enquiries?"
      open={isModalOpen?.deleteOpen}
      handleClose={() => onClose?.()}
      handleSubmitBtn={deleteEnquiry}
      loading={deleteEnquiriesStatus?.isLoading}
      disableCancelBtn={deleteEnquiriesStatus?.isLoading}
    />
  );
};
