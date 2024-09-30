import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';
import useDeleteEnquiry from './useDeleteEnquiry';
import { IChildModalState } from '../Enquiries.interface';

export const DeleteEnquiry = ({ isModalOpen, onClose }: IChildModalState) => {
  const { deleteServicesEnquiry, deleteEnquiriesStatus } = useDeleteEnquiry({
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
      handleSubmitBtn={deleteServicesEnquiry}
      loading={deleteEnquiriesStatus?.isLoading}
      disableCancelBtn={deleteEnquiriesStatus?.isLoading}
    />
  );
};
