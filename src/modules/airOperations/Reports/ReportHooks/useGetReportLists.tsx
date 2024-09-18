import {
  canDisableTab,
  emptySelectedReportsList,
  setReportsListsTotalRecords,
} from '@/redux/slices/airOperations/reports/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetAllServicesReportsListQuery } from '@/services/airOperations/reports/services-reports';
import { buildQueryParams } from '@/utils/api';
import { useRouter } from 'next/router';
import {
  REPORTS_BASE_MODULE,
  TAB_CHANGED_FILTERED,
} from '../ReportLists/ReportLists.data';

export const useGetReportLists = () => {
  const apiQuery = useLazyGetAllServicesReportsListQuery();
  const router = useRouter();
  const page = useAppSelector((state) => state?.operationsReportsLists?.page);
  const pageLimit = useAppSelector(
    (state) => state?.operationsReportsLists?.pageLimit,
  );
  const search = useAppSelector(
    (state) => state?.operationsReportsLists?.search,
  );

  const filterReportsList = useAppSelector(
    (state) => state?.operationsReportsLists?.filterReportsList,
  );

  const filter = useAppSelector(
    (state) => state?.operationsReportsLists?.filter,
  );

  const tabValue = useAppSelector(
    (state) => state?.operationsReportsLists?.tabValue,
  );

  const dispatch = useAppDispatch();

  const [lazyGetReportsListTrigger, lazyGetReportsListStatus]: any = apiQuery;

  const getReportsList = async (
    currentPage = page,
    filterReports = filterReportsList,
  ) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ...(!!filter?.length ? [...TAB_CHANGED_FILTERED?.[tabValue]] : []),
      ...(!!router?.pathname
        ? [['baseModule', REPORTS_BASE_MODULE?.[router?.pathname as string]]]
        : []),
    ];

    const getReportParam: URLSearchParams = buildQueryParams(
      additionalParams,
      filterReports,
    );

    const apiDataParameter = {
      queryParams: getReportParam,
    };
    dispatch(canDisableTab(true));
    try {
      const response =
        await lazyGetReportsListTrigger?.(apiDataParameter)?.unwrap();
      dispatch(emptySelectedReportsList());
      dispatch(
        setReportsListsTotalRecords(response?.data?.genericReports?.length),
      );
    } catch (error: any) {
      dispatch(emptySelectedReportsList());
    }
    dispatch(canDisableTab(false));
  };
  return {
    getReportsList,
    lazyGetReportsListStatus,
    page,
    pageLimit,
    search,
    filterReportsList,
    tabValue,
  };
};
