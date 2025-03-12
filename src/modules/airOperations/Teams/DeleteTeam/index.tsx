import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteTeam } from './useDeleteTeam';

const DeleteTeam = () => {
  const {
    deleteTeam,
    closeTeamDeleteModal,
    deleteTeamUsersStatus,
    isPortalOpen,
  } = useDeleteTeam();

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete team ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isOpen as boolean}
        handleClose={closeTeamDeleteModal}
        handleSubmitBtn={deleteTeam}
        loading={deleteTeamUsersStatus?.isLoading}
        disableCancelBtn={deleteTeamUsersStatus?.isLoading}
      />
    </>
  );
};

export default DeleteTeam;
