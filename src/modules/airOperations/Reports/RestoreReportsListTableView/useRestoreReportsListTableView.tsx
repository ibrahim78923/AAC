import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetRestoreReportLists } from '../ReportHooks/useGetRestoreReportLists';
import {
  setPage,
  setPageDecrement,
  setPageIncrement,
  setPageLimit,
  setSelectedRestoreReportsList,
} from '@/redux/slices/airOperations/restore-reports/slice';
import { restoreReportListsColumnsDynamic } from './RestoreReportsListTableView.data';

export const useRestoreReportListsTableView = () => {
  const {
    getRestoreReportsList,
    lazyGetRestoreReportsListStatus,
    page,
    pageLimit,
    search,
    filterRestoreReportsList,
  } = useGetRestoreReportLists();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const selectedRestoreReportsList = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.selectedRestoreReportsList,
  );

  useEffect(() => {
    if (router?.isReady) getRestoreReportsList?.();
  }, [page, pageLimit, search, filterRestoreReportsList]);

  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const setSelectedRestoreReportsLists = (ticket: any) => {
    dispatch(setSelectedRestoreReportsList<any>(ticket));
  };

  const restoreReportListsColumns = restoreReportListsColumnsDynamic(
    selectedRestoreReportsList,
    setSelectedRestoreReportsLists,
    lazyGetRestoreReportsListStatus?.data?.data?.genericReports,
  );

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());

  return {
    lazyGetRestoreReportsListStatus,
    handleSetPageLimit,
    handleSetPage,
    getRestoreReportsList,
    page,
    decrement,
    increment,
    restoreReportListsColumns,
  };
};
