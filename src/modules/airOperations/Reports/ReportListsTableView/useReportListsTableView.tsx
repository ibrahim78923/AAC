import {
  setPage,
  setPageDecrement,
  setPageIncrement,
  setPageLimit,
  setSelectedReportsList,
} from '@/redux/slices/airOperations/reports/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { reportListsColumnsDynamic } from './ReportListsTableView.data';
import { useGetReportLists } from '../ReportHooks/useGetReportLists';

export const useReportListsTableView = () => {
  const {
    getReportsList,
    lazyGetReportsListStatus,
    page,
    pageLimit,
    search,
    filterReportsList,
    tabValue,
  } = useGetReportLists();

  const router = useRouter();

  const selectedReportsList = useAppSelector(
    (state) => state?.operationsReportsLists?.selectedReportsList,
  );

  useEffect(() => {
    if (router?.isReady) getReportsList?.();
  }, [page, pageLimit, search, filterReportsList, tabValue]);

  const dispatch = useAppDispatch();
  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const setSelectedReportList = (ticket: any) => {
    dispatch(setSelectedReportsList<any>(ticket));
  };

  const reportListsColumns = reportListsColumnsDynamic(
    selectedReportsList,
    setSelectedReportList,
    lazyGetReportsListStatus?.data?.data?.genericReports,
  );

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());

  return {
    lazyGetReportsListStatus,
    handleSetPageLimit,
    handleSetPage,
    getReportsList,
    page,
    decrement,
    increment,
    reportListsColumns,
  };
};
