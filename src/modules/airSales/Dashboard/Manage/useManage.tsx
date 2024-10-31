import { PAGINATION } from '@/config';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { AIR_SALES } from '@/routesConstants/paths';
import {
  useDeleteSalesDashboardMutation,
  useGetSalesDashboardsQuery,
  useUpdateDefaultSalesDashboardMutation,
} from '@/services/airSales/dashboard';
import { getSession } from '@/utils';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useManage = () => {
  const router = useRouter();
  const theme: any = useTheme();
  const { user }: any = getSession();
  const currentUser = user?._id;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    isToggle: false,
    id: '',
  });

  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterValues, setFilterValues] = useState<any>({
    search: '',
    owner: null,
    accessRights: null,
  });

  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>(
    {},
  );

  const [deleteSalesDashboard, { isLoading: loadingDeleteDashboard }] =
    useDeleteSalesDashboardMutation();

  const [updatesalesDashboard, { isLoading: loadingUpdateDashboard }] =
    useUpdateDefaultSalesDashboardMutation();

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
    isFetching,
  } = useGetSalesDashboardsQuery({
    params: {
      page,
      limit: pageLimit,
      search: filterValues?.search ?? undefined,
      owner: filterValues?.owner?._id ? filterValues?.owner?._id : currentUser,
      accessRights: filterValues?.accessRights
        ? filterValues?.accessRights
        : undefined,
    },
  });

  const handleUpdateDefault = async (id: string, defaultVal: boolean) => {
    setLoadingState((prevState) => ({ ...prevState, [id]: true }));
    const body = {
      id: id,
      isDefault: defaultVal,
    };
    try {
      await updatesalesDashboard({ body: body })?.unwrap();
      enqueueSnackbar('Dashboard set as default successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    } finally {
      setLoadingState((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const handelNavigate = () => {
    router?.push({
      pathname: `${AIR_SALES?.CREATE_DASHBOARD}`,
      query: { type: 'add' },
    });
  };

  const resetFilters = () => {
    setFilterValues({ search: '', owner: null, accessRights: null });
  };

  return {
    loadingUpdateDashboard,
    loadingDeleteDashboard,
    handleCloseDeleteModal,
    setIsDeleteModalOpen,
    handleUpdateDefault,
    dashboardListArray,
    setIsFilterDrawer,
    isDeleteModalOpen,
    setFilterValues,
    isFilterDrawer,
    handelNavigate,
    filterValues,
    loadingState,
    resetFilters,
    setPageLimit,
    handleDelete,
    currentUser,
    isFetching,
    isLoading,
    pageLimit,
    setPage,
    router,
    theme,
    page,
  };
};
export default useManage;
