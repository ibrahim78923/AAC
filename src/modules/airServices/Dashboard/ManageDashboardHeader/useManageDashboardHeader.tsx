import { PAGINATION } from '@/config';
import {
  setIsPortalOpen,
  setSearch,
} from '@/redux/slices/airServices/dashboard/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT } from '../Dashboard.data';
import { dashboardIsPortalOpenSelector } from '@/redux/slices/airServices/dashboard/selectors';
import { shallowEqual } from 'react-redux';

export const useManageDashboardHeader = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    dashboardIsPortalOpenSelector,
    shallowEqual,
  );

  const setAction = (action: string, data: { [key: string]: any } = {}) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action,
        data,
      }),
    );
  };

  const handleSearch = (searchTerm: any) => {
    dispatch(
      setSearch<any>({
        searchTerm,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
  };

  const openFilterPortal = () =>
    setAction(SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT?.FILTER_DASHBOARD);

  return {
    openFilterPortal,
    handleSearch,
    isPortalOpen,
  };
};
