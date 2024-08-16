import { AlertModals } from '@/components/AlertModals';

export const DeleteExpense = ({
  deleteExpenseProps,
}: {
  deleteExpenseProps: {
    isDeleteExpenseModalOpen: boolean;
    setIsDeleteExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: () => void;
  };
}) => {
  const {
    isDeleteExpenseModalOpen,
    setIsDeleteExpenseModalOpen,
    handleDelete,
  } = deleteExpenseProps;

  return (
    <AlertModals
      type="delete"
      open={isDeleteExpenseModalOpen}
      handleClose={() => setIsDeleteExpenseModalOpen?.(false)}
      handleSubmitBtn={handleDelete}
      message="Are you sure want to delete this record?"
    />
  );
};
