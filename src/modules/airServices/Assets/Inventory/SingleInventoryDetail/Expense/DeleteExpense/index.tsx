import { AlertModals } from '@/components/AlertModals';
import { useDeleteExpense } from './useDeleteExpense';

export const DeleteExpense = (props: any) => {
  const { isPortalOpen } = props;

  const { apiCallInProgress, handleDelete, closeModal } =
    useDeleteExpense(props);

  return (
    <AlertModals
      type="delete"
      open={isPortalOpen?.isOpen}
      handleClose={closeModal}
      handleSubmitBtn={handleDelete}
      message="Are you sure want to delete this record?"
      loading={apiCallInProgress}
      disableCancelBtn={apiCallInProgress}
    />
  );
};
