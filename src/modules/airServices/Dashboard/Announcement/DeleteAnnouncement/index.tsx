import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteAnnouncement } from './useDeleteAnnouncement';

export const DeleteAnnouncement = (props: any) => {
  const { isPortalOpen } = props;
  const {
    deleteAnnouncement,
    deleteServicesAnnouncementOnDashboardStatus,
    closeAnnouncementDeleteModal,
  } = useDeleteAnnouncement(props);

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete announcement ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isDelete}
        handleClose={() => closeAnnouncementDeleteModal?.()}
        handleSubmitBtn={() => deleteAnnouncement?.()}
        loading={deleteServicesAnnouncementOnDashboardStatus?.isLoading}
        disableCancelBtn={
          deleteServicesAnnouncementOnDashboardStatus?.isLoading
        }
      />
    </>
  );
};
