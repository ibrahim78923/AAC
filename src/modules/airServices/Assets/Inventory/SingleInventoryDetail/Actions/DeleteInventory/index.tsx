import { AlertModals } from '@/components/AlertModals';

const DeleteInventory = ({
  isDeleteModalOpen,
  handleCloseDeleteModal,
  handleDelete,
}: any) => {
  return (
    <AlertModals
      message="Are you sure you want to delete dashboard"
      type="delete"
      open={isDeleteModalOpen}
      handleClose={handleCloseDeleteModal}
      handleSubmit={handleDelete}
    />
  );
};

export default DeleteInventory;
