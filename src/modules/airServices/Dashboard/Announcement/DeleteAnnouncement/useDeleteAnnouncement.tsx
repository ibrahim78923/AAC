import { PAGINATION } from '@/config';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useDeleteServicesAnnouncementOnDashboardMutation } from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteAnnouncement = (props: any) => {
  const {
    setPage,
    totalRecords,
    page,
    getAnnouncementListData,
    setIsPortalOpen,
    isPortalOpen,
  } = props;
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
      const newPage =
        totalRecords === SELECTED_ARRAY_LENGTH?.ONE
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getAnnouncementListData?.(newPage);
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
