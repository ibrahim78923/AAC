import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { AnnouncementPortalComponentsPropsI } from '../Announcement.interface';
import { useDeleteServicesDashboardSingleAnnouncementMutation } from '@/services/airServices/dashboard';

export const useDeleteAnnouncement = (
  props: AnnouncementPortalComponentsPropsI,
) => {
  const { setIsPortalOpen, isPortalOpen, getSingleDashboardData } = props;
  const [
    deleteServicesAnnouncementOnDashboardTrigger,
    deleteServicesAnnouncementOnDashboardStatus,
  ] = useDeleteServicesDashboardSingleAnnouncementMutation();

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

  const apiCallInProgress =
    deleteServicesAnnouncementOnDashboardStatus?.isLoading;

  return {
    deleteAnnouncement,
    deleteServicesAnnouncementOnDashboardStatus,
    closeAnnouncementDeleteModal,
    apiCallInProgress,
  };
};
