import { AlertModals } from '@/components/AlertModals';
import { useDeleteRole } from './useDeleteRole';

export const DeleteRole = (props: any) => {
  const { openDeleteModal } = props;
  const { closeModal, apiCallInProgress, handleSubmitDelete } =
    useDeleteRole(props);

  return (
    <AlertModals
      message={'Are you sure you want to delete this role?'}
      type={'delete'}
      open={openDeleteModal?.isOpen}
      handleClose={closeModal}
      handleSubmitBtn={handleSubmitDelete}
      loading={apiCallInProgress}
      disableCancelBtn={apiCallInProgress}
    />
  );
};
