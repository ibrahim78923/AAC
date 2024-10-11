import {
  emptySelectedRestoreReportsList,
  setRestoreReportsListsTotalRecords,
} from '@/redux/slices/airOperations/restore-reports/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { buildQueryParams } from '@/utils/api';
import { useRouter } from 'next/router';
import { useLazyGetOperationsRestoreReportsListQuery } from '@/services/airOperations/reports';

export const useGetRestoreReportLists = () => {
  const router = useRouter();
  const baseModule = router?.query?.baseModule;

  const page = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.page,
  );
  const pageLimit = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.pageLimit,
  );
  const search = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.search,
  );

  const filterRestoreReportsList = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.filterRestoreReportsList,
  );

  const dispatch = useAppDispatch();

  const [
    lazyGetRestoreReportsListTrigger,
    lazyGetRestoreReportsListStatus,
  ]: any = useLazyGetOperationsRestoreReportsListQuery?.();

  const getRestoreReportsList = async (
    currentPage = page,
    filterReports = filterRestoreReportsList,
  ) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ...(!!baseModule ? [['baseModule', baseModule]] : []),
    ];

    const getReportParam: URLSearchParams = buildQueryParams(
      additionalParams,
      filterReports,
    );

    const apiDataParameter = {
      queryParams: getReportParam,
    };

    try {
      const response =
        await lazyGetRestoreReportsListTrigger?.(apiDataParameter)?.unwrap();
      dispatch(emptySelectedRestoreReportsList());
      dispatch(
        setRestoreReportsListsTotalRecords(
          response?.data?.genericReports?.length,
        ),
      );
    } catch (error: any) {
      dispatch(emptySelectedRestoreReportsList());
    }
  };
  return {
    getRestoreReportsList,
    lazyGetRestoreReportsListStatus,
    page,
    pageLimit,
    search,
    filterRestoreReportsList,
  };
};
