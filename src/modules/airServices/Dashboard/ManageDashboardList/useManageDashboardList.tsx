import {
  setPageDecrement,
  setIsPortalOpen,
  setPage,
  setPageIncrement,
  setPageLimit,
} from '@/redux/slices/airServices/dashboard/slice';
import { manageDashboardsListColumnsDynamic } from './ManageDashboardList.data';
import { useAppDispatch } from '@/redux/store';
import { useGetDashboardList } from '../DashboardHooks/useGetDashboardLists';
import { useEffect, useMemo } from 'react';
import { getActivePermissionsSession, getSession } from '@/utils';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

export const useManageDashboardList = () => {
  const dispatch = useAppDispatch();

  const canChangeDefaultDashboard = useMemo(() => {
    const permissions = getActivePermissionsSession();
    return permissions?.includes(
      AIR_SERVICES_DASHBOARD_PERMISSIONS?.SET_DEFAULT_DASHBOARD,
    );
  }, []);

  const authUserId = useMemo(() => {
    const userId = getSession() as any;
    return userId?.user?._id;
  }, []);

  const {
    getDashboardListData,
    lazyGetServicesDashboardListStatus,
    page,
    pageLimit,
    search,
    filterDashboardLists,
  } = useGetDashboardList?.();

  useEffect(() => {
    getDashboardListData();
  }, [search, page, pageLimit, filterDashboardLists]);

  const setAction = (action: string, data: { [key: string]: any } = {}) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action,
        data,
      }),
    );
  };

  const manageDashboardsListColumns = manageDashboardsListColumnsDynamic?.(
    setAction,
    authUserId,
    canChangeDefaultDashboard,
  );

  const handleSetPage = (page: number) => {
    dispatch(setPage<any>(page));
  };

  const handleSetPageLimit = (pageLimit: number) => {
    dispatch(setPageLimit<any>(pageLimit));
  };

  const handlePageChange = (currentPage: number) => {
    handleSetPage?.(currentPage);
  };

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());

  const refetchDashboardList = () => getDashboardListData?.(page);

  return {
    manageDashboardsListColumns,
    lazyGetServicesDashboardListStatus,
    handleSetPage,
    handleSetPageLimit,
    handlePageChange,
    increment,
    decrement,
    refetchDashboardList,
  };
};
