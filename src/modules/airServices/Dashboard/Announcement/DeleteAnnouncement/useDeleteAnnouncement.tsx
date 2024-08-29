import { useDeleteServicesAnnouncementOnDashboardMutation } from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { AnnouncementPortalComponentsPropsI } from '../Announcement.interface';

export const useDeleteAnnouncement = (
  props: AnnouncementPortalComponentsPropsI,
) => {
  const { setIsPortalOpen, isPortalOpen, getSingleDashboardData } = props;
  const [
    deleteServicesAnnouncementOnDashboardTrigger,
    deleteServicesAnnouncementOnDashboardStatus,
  ] = useDeleteServicesAnnouncementOnDashboardMutation();

  const deleteAnnouncement = async () => {
    const apiDataParameter = {
      queryParams: {
        Ids: isPortalOpen?.data?._id,
      },
    };
    try {
      await deleteServicesAnnouncementOnDashboardTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar?.('Announcement deleted successfully!');
      closeAnnouncementDeleteModal?.();
      await getSingleDashboardData?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeAnnouncementDeleteModal = () => {
    setIsPortalOpen?.({});
  };

  return {
    deleteAnnouncement,
    deleteServicesAnnouncementOnDashboardStatus,
    closeAnnouncementDeleteModal,
  };
};
