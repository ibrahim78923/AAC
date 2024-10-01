import { PAGINATION } from '@/config';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ManageDashboardPortalComponentPropsI } from '../ManageDashboard/ManageDashboard.interface';
import { DELETE_DASHBOARD_SUCCESS } from '../Dashboard.data';
import { useDeleteServicesDashboardSingleDashboardMutation } from '@/services/airServices/dashboard';

const { CURRENT_PAGE } = PAGINATION ?? {};
const { ONE } = SELECTED_ARRAY_LENGTH ?? {};

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
  ] = useDeleteServicesDashboardSingleDashboardMutation();

  const refetchApi = async () => {
    const newPage = totalRecords === ONE ? CURRENT_PAGE : page;
    setPage?.(newPage);
    await getDashboardListData?.(newPage);
  };

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
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message ?? error?.message);
    }
  };

  const closeDashboardDeleteModal = () => {
    setIsPortalOpen?.({});
  };

  const apiCallInProgress = deleteSingleServicesDashboardStatus?.isLoading;

  return {
    deleteDashboard,
    deleteSingleServicesDashboardStatus,
    closeDashboardDeleteModal,
    apiCallInProgress,
  };
};
