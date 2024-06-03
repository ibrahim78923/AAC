import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteRoles } from './useDeleteRoles';

export const DeleteRoles = (props: any) => {
  const { isPortalOpen } = props;
  const { deleteRoles, deleteRoleForLoyaltyStatus, closeDeleteModal } =
    useDeleteRoles(props);

  return (
    <AlertModals
      type={ALERT_MODALS_TYPE?.DELETE}
      message="Are you sure you want to delete this role?"
      open={isPortalOpen?.isDelete}
      handleClose={() => closeDeleteModal?.()}
      handleSubmitBtn={() => deleteRoles?.()}
      cancelBtnText="Cancel"
      loading={deleteRoleForLoyaltyStatus?.isLoading}
      disableCancelBtn={deleteRoleForLoyaltyStatus?.isLoading}
    />
  );
};
