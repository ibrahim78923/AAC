import { AlertModals } from '@/components/AlertModals';
import { useDeleteSoftware } from './useDeleteSoftware';

export const DeleteSoftware = (props: any) => {
  const { deleteModalOpen, setDeleteModalOpen } = props;
  const { deleteSoftwareStatus, deleteSoftware } = useDeleteSoftware(props);
  return (
    <AlertModals
      type="delete"
      open={deleteModalOpen}
      loading={deleteSoftwareStatus?.isLoading}
      handleClose={() => setDeleteModalOpen(false)}
      handleSubmitBtn={deleteSoftware}
      message="Are you sure  want to delete this Software ?"
    />
  );
};
