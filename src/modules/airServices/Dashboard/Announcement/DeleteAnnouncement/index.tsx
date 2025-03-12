import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useDeleteAnnouncement } from './useDeleteAnnouncement';
import { AnnouncementPortalComponentsPropsI } from '../Announcement.interface';

const DeleteAnnouncement = (props: AnnouncementPortalComponentsPropsI) => {
  const { isPortalOpen } = props;
  const {
    deleteAnnouncement,
    closeAnnouncementDeleteModal,
    apiCallInProgress,
  } = useDeleteAnnouncement(props);

  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete announcement ?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isPortalOpen?.isDelete as boolean}
        handleClose={closeAnnouncementDeleteModal}
        handleSubmitBtn={deleteAnnouncement}
        loading={apiCallInProgress}
        disableCancelBtn={apiCallInProgress}
      />
    </>
  );
};

export default DeleteAnnouncement;
