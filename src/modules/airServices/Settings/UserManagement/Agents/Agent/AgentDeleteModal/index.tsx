import { AlertModals } from '@/components/AlertModals';

export const AgentDeleteModal = ({ deleteAgentProps }: any) => {
  const { openDeleteModel, setOpenDeleteModel, handleDelete } =
    deleteAgentProps;

  return (
    <AlertModals
      type="delete"
      open={openDeleteModel}
      handleClose={() => setOpenDeleteModel?.(false)}
      handleSubmitBtn={handleDelete}
      message="Are you sure want to delete this record?"
    />
  );
};
