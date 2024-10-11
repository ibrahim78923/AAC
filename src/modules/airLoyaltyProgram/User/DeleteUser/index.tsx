import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteUser } from './useDeleteUser';

export const DeleteUser = () => {
  const { deleteUser, closeUserDeleteModal, apiCallInProgress, isPortalOpen } =
    useDeleteUser();

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete user ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isOpen}
        handleClose={closeUserDeleteModal}
        handleSubmitBtn={deleteUser}
        loading={apiCallInProgress}
        disableCancelBtn={apiCallInProgress}
      />
    </>
  );
};
