import { PAGINATION } from '@/config';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useDeleteMarketingDashboardMutation,
  useGetMarketingDashboardsQuery,
  useUpdateDefaultMarketingDashboardMutation,
} from '@/services/airMarketer/dasboard';
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

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [filterValues, setFilterValues] = useState<any>({
    search: '',
    owner: null,
    accessRights: null,
  });

  const [deleteSalesDashboard, { isLoading: loadingDeleteDashboard }] =
    useDeleteMarketingDashboardMutation();

  const [updatesalesDashboard, { isLoading: loadingUpdateDashboard }] =
    useUpdateDefaultMarketingDashboardMutation();

  const { data: marketingDashboardsListArray, isLoading } =
    useGetMarketingDashboardsQuery({
      params: {
        page,
        limit: pageLimit,
        search: filterValues?.search ?? undefined,
        owner: filterValues?.owner?._id
          ? filterValues?.owner?._id
          : currentUser,
        accessRights: filterValues?.accessRights
          ? filterValues?.accessRights
          : undefined,
      },
    });

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

  const handleUpdateDefault = async (id: string, defaultVal: boolean) => {
    const body = {
      id: id,
      isDefault: defaultVal,
    };
    await updatesalesDashboard({ body: body })?.unwrap();
    enqueueSnackbar('Default dashboard updated successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  const resetFilters = () => {
    setFilterValues({ search: '', owner: null, accessRights: null });
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen({ isToggle: false, id: '' });
  };

  return {
    marketingDashboardsListArray,
    loadingDeleteDashboard,
    loadingUpdateDashboard,
    handleCloseDeleteModal,
    setIsOpenFilterDrawer,
    setIsDeleteModalOpen,
    handleUpdateDefault,
    isOpenFilterDrawer,
    isDeleteModalOpen,
    setFilterValues,
    filterValues,
    resetFilters,
    handleDelete,
    setPageLimit,
    currentUser,
    isLoading,
    pageLimit,
    setPage,
    router,
    theme,
  };
};
export default useManage;
