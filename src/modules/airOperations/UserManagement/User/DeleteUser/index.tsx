import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteUser } from './useDeleteUser';
import { UserPortalComponentPropsI } from '../User.interface';

export const DeleteUser = (props: UserPortalComponentPropsI) => {
  const { isPortalOpen } = props;
  const {
    deleteUser,
    closeUserDeleteModal,
    deleteProductUsersForOperationStatus,
  } = useDeleteUser(props);

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete user ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isDelete as boolean}
        handleClose={() => closeUserDeleteModal?.()}
        handleSubmitBtn={() => deleteUser?.()}
        loading={deleteProductUsersForOperationStatus?.isLoading}
        disableCancelBtn={deleteProductUsersForOperationStatus?.isLoading}
      />
    </>
  );
};
