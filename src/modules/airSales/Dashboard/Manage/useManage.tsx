import { PAGINATION } from '@/config';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { AIR_SALES } from '@/routesConstants/paths';
import {
  useDeleteSalesDashboardMutation,
  useGetSalesDashboardsQuery,
} from '@/services/airSales/dashboard';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useManage = () => {
  const router = useRouter();
  const theme: any = useTheme();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    isToggle: false,
    id: '',
  });
  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterValues, setFilterValues] = useState({
    search: '',
    owner: null,
    accessRights: null,
  });

  const [deleteSalesDashboard, { isLoading: loadingDeleteDashboard }] = useDeleteSalesDashboardMutation();

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen({ isToggle: false, id: '' });
  };

  const handleDelete = async (deleteId: any) => {
    try {
      await deleteSalesDashboard(deleteId)?.unwrap();
      setIsDeleteModalOpen({ isToggle: false, id: '' });
      enqueueSnackbar('Dashboard deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const {
    data: dashboardListArray,
    isLoading,
    // status,
  } = useGetSalesDashboardsQuery({
    params: {
      page,
      limit: pageLimit,
      search: filterValues?.search ?? undefined,
      owner: filterValues?.owner ? filterValues?.owner : undefined,
      accessRights: filterValues?.accessRights
        ? filterValues?.accessRights
        : undefined,
    },
  });

  const handelNavigate = () => {
    router?.push({
      pathname: `${AIR_SALES?.CREATE_DASHBOARD}`,
      // query: { id: '' },
    });
  };

  const resetFilters = () => {
    setFilterValues({ search: '', owner: null, accessRights: null });
  };

  return {
    loadingDeleteDashboard,
    handleCloseDeleteModal,
    setIsDeleteModalOpen,
    dashboardListArray,
    setIsFilterDrawer,
    isDeleteModalOpen,
    setFilterValues,
    isFilterDrawer,
    handelNavigate,
    filterValues,
    resetFilters,
    setPageLimit,
    handleDelete,
    isLoading,
    pageLimit,
    setPage,
    router,
    theme,
    page,
  };
};
export default useManage;
