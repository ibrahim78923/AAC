import { PAGINATION } from '@/config';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { DELETE_DASHBOARD_SUCCESS } from '../Dashboard.data';
import { useDeleteServicesDashboardSingleDashboardMutation } from '@/services/airServices/dashboard';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetDashboardList } from '../DashboardHooks/useGetDashboardLists';
import {
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/dashboard/slice';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useDeleteDashboard = () => {
  const dispatch = useAppDispatch();

  const { getDashboardListData, page } = useGetDashboardList?.();

  const [
    deleteSingleServicesDashboardTrigger,
    deleteSingleServicesDashboardStatus,
  ] = useDeleteServicesDashboardSingleDashboardMutation();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesDashboard?.isPortalOpen,
  );

  const totalRecords = useAppSelector(
    (state) => state?.servicesDashboard?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      totalRecords === SELECTED_ARRAY_LENGTH?.ONE
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
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
    dispatch(setIsPortalClose?.());
  };

  const apiCallInProgress = deleteSingleServicesDashboardStatus?.isLoading;

  return {
    deleteDashboard,
    deleteSingleServicesDashboardStatus,
    closeDashboardDeleteModal,
    apiCallInProgress,
    isPortalOpen,
  };
};
