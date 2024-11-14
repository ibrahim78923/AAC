import {
  dashboardFilterSelector,
  dashboardPageLimitSelector,
  dashboardPageSelector,
  dashboardSearchSelector,
} from '@/redux/slices/airServices/dashboard/selectors';
import { setDashboardListsTotalRecords } from '@/redux/slices/airServices/dashboard/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetServicesDashboardListQuery } from '@/services/airServices/dashboard';
import { getActiveProductSession } from '@/utils';
import { buildQueryParams } from '@/utils/api';
import { useMemo } from 'react';
import { shallowEqual } from 'react-redux';

export const useGetDashboardList = () => {
  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);

  const page = useAppSelector(dashboardPageSelector);

  const pageLimit = useAppSelector(dashboardPageLimitSelector);

  const search = useAppSelector(dashboardSearchSelector);

  const filterDashboardLists = useAppSelector(
    dashboardFilterSelector,
    shallowEqual,
  );

  const dispatch = useAppDispatch();

  const [
    lazyGetServicesDashboardListTrigger,
    lazyGetServicesDashboardListStatus,
  ] = useLazyGetServicesDashboardListQuery();

  const getDashboardListData = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ['productId', productId],
    ];

    const getDashboardParam: URLSearchParams = buildQueryParams(
      additionalParams,
      filterDashboardLists,
    );

    const apiDataParameter = {
      queryParams: getDashboardParam,
    };

    try {
      const response =
        await lazyGetServicesDashboardListTrigger(apiDataParameter)?.unwrap();
      const totalNoOfRecords = response?.data?.dynamicdashboards?.length;
      dispatch(setDashboardListsTotalRecords<any>(totalNoOfRecords));
    } catch (error: any) {}
  };

  return {
    getDashboardListData,
    lazyGetServicesDashboardListStatus,
    page,
    pageLimit,
    search,
    filterDashboardLists,
  };
};
