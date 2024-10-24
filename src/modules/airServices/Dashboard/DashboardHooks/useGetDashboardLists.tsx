import useAuth from '@/hooks/useAuth';
import { setDashboardListsTotalRecords } from '@/redux/slices/airServices/dashboard/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetServicesDashboardListQuery } from '@/services/airServices/dashboard';
import { buildQueryParams } from '@/utils/api';

export const useGetDashboardList = () => {
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};

  const page = useAppSelector((state) => state?.servicesDashboard?.page);

  const pageLimit = useAppSelector(
    (state) => state?.servicesDashboard?.pageLimit,
  );

  const search = useAppSelector((state) => state?.servicesDashboard?.search);

  const filterDashboardLists = useAppSelector(
    (state) => state?.servicesDashboard?.filterDashboardLists,
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
