import { PAGINATION } from '@/config';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useDeleteDynamicServicesDashboardMutation } from '@/services/airServices/dashboard';
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
    deleteSingleServicesAnnouncementTrigger,
    deleteSingleServicesAnnouncementStatus,
  ] = useDeleteDynamicServicesDashboardMutation();

  const deleteAnnouncement = async () => {
    const apiDataParameter = {
      queryParams: {
        ids: isPortalOpen?.data?._id,
      },
    };
    try {
      await deleteSingleServicesAnnouncementTrigger(apiDataParameter)?.unwrap();
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
    deleteSingleServicesAnnouncementStatus,
    closeAnnouncementDeleteModal,
  };
};
