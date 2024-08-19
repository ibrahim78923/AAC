import { AlertModals } from '@/components/AlertModals';

export const DeleteExpense = ({
  deleteExpenseProps,
}: {
  deleteExpenseProps: {
    isDeleteExpenseModalOpen: boolean;
    setIsDeleteExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: () => void;
    deleteLoading: boolean;
  };
}) => {
  const {
    isDeleteExpenseModalOpen,
    setIsDeleteExpenseModalOpen,
    handleDelete,
    deleteLoading,
  } = deleteExpenseProps;

  return (
    <AlertModals
      type="delete"
      open={isDeleteExpenseModalOpen}
      handleClose={() => setIsDeleteExpenseModalOpen?.(false)}
      handleSubmitBtn={handleDelete}
      message="Are you sure want to delete this record?"
      loading={deleteLoading}
      disableCancelBtn={deleteLoading}
    />
  );
};
