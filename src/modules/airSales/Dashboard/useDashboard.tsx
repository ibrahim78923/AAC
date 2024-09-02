import { PAGINATION } from '@/config';
import {
  useGetAllSalesDashboardsQuery,
  useGetSalesDashboardsQuery,
} from '@/services/airSales/dashboard';
import { getSession } from '@/utils';
import { useState } from 'react';
const useDashboard = () => {
  const { user }: any = getSession();
  const currentUser = user?._id;

  const [isShowCreateDashboardForm, setIsShowCreateDashboardForm] =
    useState(false);
  const [isShowEditDashboard, setIsShowEditDashboard] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = {
    page,
    limit: pageLimit,
    owner: currentUser,
  };
  const { data: dashboardListArray, isLoading: dashboardListLoading } =
    useGetSalesDashboardsQuery({ params: params });

  const dropdownOptions = dashboardListArray?.dynamicdashboards;

  const {
    data: getDashboards,
    isLoading: dashboardLoading,
    isError: dashboardNotFound,
  } = useGetAllSalesDashboardsQuery({
    params: { page: 1, limit: 10, dashboardId: selectedDashboard },
  });

  const dashboardsData = getDashboards?.data;

  return {
    setIsShowCreateDashboardForm,
    isShowCreateDashboardForm,
    setIsShowEditDashboard,
    setSelectedDashboard,
    dashboardListLoading,
    isShowEditDashboard,
    dashboardListArray,
    dashboardNotFound,
    dashboardLoading,
    dropdownOptions,
    dashboardsData,
    setPageLimit,
    setPage,
  };
};
export default useDashboard;
