import { PAGINATION } from '@/config';
import {
  useGetAllSalesDashboardsQuery,
  useGetSalesDashboardsQuery,
} from '@/services/airSales/dashboard';
import { useState } from 'react';
const useDashboard = () => {
  const [isShowCreateDashboardForm, setIsShowCreateDashboardForm] =
    useState(false);
  const [isShowEditDashboard, setIsShowEditDashboard] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = {
    page,
    limit: pageLimit,
  };
  const { data: dashboardListArray, isLoading: dashboardListLoading } =
    useGetSalesDashboardsQuery({ params: params });

  const dropdownOptions = dashboardListArray?.dynamicdashboards;

  const { data: getAllDashboards, isLoading: dashboardLoading } =
    useGetAllSalesDashboardsQuery({
      params: { page: 1, limit: 10, dashboardId: selectedDashboard },
    });

  const dashboardsData = getAllDashboards?.data;

  return {
    setIsShowCreateDashboardForm,
    isShowCreateDashboardForm,
    setIsShowEditDashboard,
    setSelectedDashboard,
    dashboardListLoading,
    isShowEditDashboard,
    dashboardListArray,
    dashboardLoading,
    dropdownOptions,
    dashboardsData,
    setPageLimit,
    setPage,
  };
};
export default useDashboard;
