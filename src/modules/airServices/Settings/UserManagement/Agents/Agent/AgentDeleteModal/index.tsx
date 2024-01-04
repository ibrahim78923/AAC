import { AlertModals } from '@/components/AlertModals';

export const AgentDeleteModal = ({ deleteAgentProps }: any) => {
  const { openDeleteModal, setOpenDeleteModal, handleDelete } =
    deleteAgentProps;

  return (
    <AlertModals
      type="delete"
      open={openDeleteModal}
      handleClose={() => setOpenDeleteModal?.(false)}
      handleSubmitBtn={handleDelete}
      message="Are you sure want to delete this record?"
    />
  );
};
