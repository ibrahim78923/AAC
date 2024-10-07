import {
  canDisableTab,
  emptySelectedReportsList,
  setReportsListsTotalRecords,
} from '@/redux/slices/airOperations/reports/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { buildQueryParams } from '@/utils/api';
import { useRouter } from 'next/router';
import { TAB_CHANGED_FILTERED } from '../ReportLists/ReportLists.data';
import { useLazyGetOperationsReportsListQuery } from '@/services/airOperations/reports';

export const useGetReportLists = () => {
  const router = useRouter();
  const baseModule = router?.query?.baseModule;

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

  const [lazyGetReportsListTrigger, lazyGetReportsListStatus]: any =
    useLazyGetOperationsReportsListQuery();

  const getReportsList = async (
    currentPage = page,
    filterReports = filterReportsList,
  ) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ...(!!filter?.length ? [...TAB_CHANGED_FILTERED?.[tabValue]] : []),
      ...(!!baseModule ? [['baseModule', baseModule]] : []),
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
