import { PAGINATION } from '@/config';
import {
  useGetAllMarketingDashboardsQuery,
  useGetMarketingDashboardsQuery,
} from '@/services/airMarketer/dasboard';
import { getSession } from '@/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AIR_MARKETER } from '../../../routesConstants/paths';

const useDashboard = () => {
  const router = useRouter();
  const { user }: any = getSession();
  const currentUser = user?._id;

  const [isShowCreateDashboardForm, setIsShowCreateDashboardForm] =
    useState(false);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [selectedDashboard, setSelectedDashboard] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const params = {
    page,
    limit: pageLimit,
    owner: currentUser,
  };
  const { data: dashboardListArray, isLoading: dashboardListLoading } =
    useGetMarketingDashboardsQuery({ params: params });

  const dropdownOptions = dashboardListArray?.dynamicdashboards;

  const {
    data: getDashboards,
    isLoading: dashboardLoading,
    isError: dashboardNotFound,
  } = useGetAllMarketingDashboardsQuery({
    params: { page: 1, limit: 10, dashboardId: selectedDashboard },
  });

  const dashboardsData = getDashboards?.data;

  const handelNavigate = () => {
    router?.push({
      pathname: `${AIR_MARKETER?.CREATE_DASHBOARD}`,
      query: { type: 'add' },
    });
  };

  return {
    setIsShowCreateDashboardForm,
    isShowCreateDashboardForm,
    dashboardListLoading,
    setSelectedDashboard,
    selectedDashboard,
    dashboardNotFound,
    handelNavigate,
    dashboardLoading,
    dropdownOptions,
    dashboardsData,
    setPageLimit,
    setPage,
    page,
  };
};
export default useDashboard;
