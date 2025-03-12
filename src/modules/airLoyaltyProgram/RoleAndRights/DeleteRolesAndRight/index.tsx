import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteRolesAndRight } from './useDeleteRolesAndRight';

const DeleteRolesAndRight = () => {
  const {
    deleteRoleAndRights,
    apiCallInProgress,
    closeDeletePortal,
    isPortalOpen,
  } = useDeleteRolesAndRight();

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete this role?"
      open={isPortalOpen?.isOpen}
      handleClose={closeDeletePortal}
      handleSubmitBtn={deleteRoleAndRights}
      loading={apiCallInProgress}
      disableCancelBtn={apiCallInProgress}
    />
  );
};

export default DeleteRolesAndRight;
