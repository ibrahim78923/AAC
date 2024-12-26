import {
  manageDashboardFilterFormDefaultValuesDynamic,
  manageDashboardsFilterFormFieldsDynamic,
} from './ManageDashboardFilter.data';
import { PAGINATION } from '@/config';
import { filteredEmptyValues } from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptyFilterDashboardLists,
  setFilterDashboardLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/dashboard/slice';
import { shallowEqual } from 'react-redux';
import {
  dashboardFilterSelector,
  dashboardIsPortalOpenSelector,
} from '@/redux/slices/airServices/dashboard/selectors';
import { useFormLib } from '@/hooks/useFormLib';

export const useManageDashboardFilter = () => {
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    dashboardIsPortalOpenSelector,
    shallowEqual,
  );

  const filterDashboardLists = useAppSelector(
    dashboardFilterSelector,
    shallowEqual,
  );

  const formLibProps = {
    defaultValues:
      manageDashboardFilterFormDefaultValuesDynamic(filterDashboardLists),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const onSubmit = async (data: any) => {
    const dashboardFilteredFields: any = filteredEmptyValues(data);

    if (!Object?.keys(dashboardFilteredFields || {})?.length) {
      dispatch(
        setFilterDashboardLists<any>({
          filterValues: dashboardFilteredFields,
          page: PAGINATION?.CURRENT_PAGE,
        }),
      );
      closeDashboardFilterForm();
      return;
    }

    dispatch(
      setFilterDashboardLists<any>({
        filterValues: dashboardFilteredFields,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
    closeDashboardFilterForm();
  };

  const closeDashboardFilterForm = () => {
    reset();
    closePortal?.();
  };

  const resetDashboardFilterForm = async () => {
    if (!!Object?.keys(filterDashboardLists ?? {})?.length) {
      dispatch(emptyFilterDashboardLists());
    }
    reset();
    closePortal?.();
  };

  const closePortal = () => {
    dispatch(setIsPortalClose?.());
  };

  const dashboardFilterFormFields = manageDashboardsFilterFormFieldsDynamic();

  return {
    methods,
    handleSubmit,
    onSubmit,
    resetDashboardFilterForm,
    dashboardFilterFormFields,
    closePortal,
    isPortalOpen,
  };
};
