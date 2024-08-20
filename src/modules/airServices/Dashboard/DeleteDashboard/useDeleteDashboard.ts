import { PAGINATION } from '@/config';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useDeleteDynamicServicesDashboardMutation } from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ManageDashboardPortalComponentPropsI } from '../ManageDashboard/ManageDashboard.interface';
import { DELETE_DASHBOARD_SUCCESS } from '../Dashboard.data';

export const useDeleteDashboard = (
  props: ManageDashboardPortalComponentPropsI,
) => {
  const {
    setPage,
    totalRecords,
    page,
    getDashboardListData,
    setIsPortalOpen,
    isPortalOpen,
  } = props;
  const [
    deleteSingleServicesDashboardTrigger,
    deleteSingleServicesDashboardStatus,
  ] = useDeleteDynamicServicesDashboardMutation();

  const deleteDashboard = async () => {
    const apiDataParameter = {
      queryParams: {
        ids: isPortalOpen?.data?._id,
      },
    };
    try {
      const response =
        await deleteSingleServicesDashboardTrigger(apiDataParameter)?.unwrap();
      if (response?.message !== DELETE_DASHBOARD_SUCCESS) {
        throw new Error(response?.message);
      }
      successSnackbar?.('Dashboard deleted successfully!');
      closeDashboardDeleteModal?.();
      const newPage =
        totalRecords === SELECTED_ARRAY_LENGTH?.ONE
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getDashboardListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message ?? error?.message);
    }
  };

  const closeDashboardDeleteModal = () => {
    setIsPortalOpen?.({});
  };

  return {
    deleteDashboard,
    deleteSingleServicesDashboardStatus,
    closeDashboardDeleteModal,
  };
};
