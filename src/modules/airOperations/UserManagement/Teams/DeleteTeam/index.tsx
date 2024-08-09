import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteTeam } from './useDeleteTeam';

export const DeleteTeam = (props: any) => {
  const { isPortalOpen } = props;
  const { deleteTeam, closeTeamDeleteModal, deleteTeamUsersStatus } =
    useDeleteTeam(props);

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete team ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isDelete}
        handleClose={() => closeTeamDeleteModal?.()}
        handleSubmitBtn={() => deleteTeam?.()}
        loading={deleteTeamUsersStatus?.isLoading}
        disableCancelBtn={deleteTeamUsersStatus?.isLoading}
      />
    </>
  );
};
