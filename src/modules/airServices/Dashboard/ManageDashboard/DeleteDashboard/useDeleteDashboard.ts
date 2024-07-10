import { PAGINATION } from '@/config';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useDeleteSingleServicesDashboardMutation } from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { PortalComponentPropsI } from '../ManageDashboard.interface';

export const useDeleteDashboard = (props: PortalComponentPropsI) => {
  const { setPage, totalRecords, page, getDashboardListData, setIsPortalOpen } =
    props;
  const [
    deleteSingleServicesDashboardTrigger,
    deleteSingleServicesDashboardStatus,
  ] = useDeleteSingleServicesDashboardMutation();

  const deleteDashboard = async () => {
    const apiDataParameter = {};
    try {
      await deleteSingleServicesDashboardTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Dashboard deleted successfully!');
      closeDashboardDeleteModal?.();
      const newPage =
        totalRecords === SELECTED_ARRAY_LENGTH?.ONE
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getDashboardListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
