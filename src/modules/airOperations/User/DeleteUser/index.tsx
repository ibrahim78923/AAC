import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteUser } from './useDeleteUser';

const DeleteUser = () => {
  const {
    deleteUser,
    closeUserDeleteModal,
    deleteProductUsersForOperationStatus,
    isPortalOpen,
  } = useDeleteUser();

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete user ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isOpen as boolean}
        handleClose={closeUserDeleteModal}
        handleSubmitBtn={deleteUser}
        loading={deleteProductUsersForOperationStatus?.isLoading}
        disableCancelBtn={deleteProductUsersForOperationStatus?.isLoading}
      />
    </>
  );
};

export default DeleteUser;
