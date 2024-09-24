import { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { getActivePermissionsSession } from '@/utils';
import {
  setPage,
  setPageDecrement,
  setPageIncrement,
  setPageLimit,
  setSelectedTicketLists,
} from '@/redux/slices/airServices/related-tickets/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { relatedTicketsListsColumnDynamic } from './RelatedTicketLists.data';
import { useGetRelatedTicketList } from '../../../TicketsServicesHooks/useGetRelatedTicketList';

export const useRelatedTicketsLists = () => {
  const dispatch = useAppDispatch();
  const router: NextRouter = useRouter();
  const {
    getChildTicketsListData,
    lazyGetChildTicketsStatus,
    page,
    pageLimit,
    totalRelatedTickets,
    count,
    totalPages,
    currentPage,
    pageSize,
  } = useGetRelatedTicketList?.();
  const overallPermissions = getActivePermissionsSession();

  const selectedRelatedTicketLists = useAppSelector(
    (state) => state?.servicesRelatedTickets?.selectedRelatedTicketLists,
  );

  useEffect(() => {
    getChildTicketsListData();
  }, [page, pageLimit]);

  const isLoading = lazyGetChildTicketsStatus?.isLoading;
  const isError = lazyGetChildTicketsStatus?.isError;
  const isFetching = lazyGetChildTicketsStatus?.isFetching;
  const isSuccess = lazyGetChildTicketsStatus?.isSuccess;

  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const setSelectedRelatedTicketList = (ticket: any) => {
    dispatch(setSelectedTicketLists<any>(ticket));
  };

  const handlePageChange = (currentPage: number) => {
    handleSetPage?.(currentPage);
  };

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());
  const refetch = () => getChildTicketsListData?.(page);

  const relatedTicketsListsColumn = relatedTicketsListsColumnDynamic(
    totalRelatedTickets,
    selectedRelatedTicketLists,
    setSelectedRelatedTicketList,
    router,
    overallPermissions,
  );
  const isApiCalled =
    !lazyGetChildTicketsStatus?.data && !lazyGetChildTicketsStatus?.error;

  return {
    relatedTicketsListsColumn,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    getChildTicketsListData,
    page,
    handleSetPage,
    handleSetPageLimit,
    totalRelatedTickets,
    count,
    totalPages,
    currentPage,
    pageSize,
    increment,
    decrement,
    handlePageChange,
    refetch,
    isApiCalled,
  };
};
