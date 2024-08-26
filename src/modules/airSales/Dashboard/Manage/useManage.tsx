import { PAGINATION } from '@/config';
import { AIR_SALES } from '@/routesConstants/paths';
import {
  useDeleteSalesDashboardMutation,
  useGetSalesDashboardsQuery,
} from '@/services/airSales/dashboard';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
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

  const [deleteSalesDashboard] = useDeleteSalesDashboardMutation();

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen({ isToggle: false, id: '' });
  };

  const handleDelete = (deleteId: any) => {
    deleteSalesDashboard(deleteId)?.unwrap();
    setIsDeleteModalOpen({ isToggle: false, id: '' });
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
      query: { id: '' },
    });
  };

  const resetFilters = () => {
    setFilterValues({ search: '', owner: null, accessRights: null });
  };

  return {
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
