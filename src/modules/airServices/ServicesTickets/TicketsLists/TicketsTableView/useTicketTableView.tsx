import { useEffect } from 'react';
import { useGetTicketList } from '../../TicketsServicesHooks/useGetTicketList';
import {
  setPage,
  setPageDecrement,
  setPageIncrement,
  setPageLimit,
  setSelectedTicketLists,
} from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import { ticketsListsColumnDynamic } from './TicketsTableView.data';

export const useTicketTableView = () => {
  const {
    getTicketsListData,
    lazyGetTicketsStatus,
    page,
    pageLimit,
    search,
    filterTicketLists,
  } = useGetTicketList();

  const router = useRouter();

  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );

  const ticketsListsActiveColumn = useAppSelector(
    (state) => state?.servicesTickets?.ticketsListsActiveColumn,
  );

  useEffect(() => {
    getTicketsListData?.();
  }, [page, pageLimit, search, filterTicketLists]);

  const dispatch = useAppDispatch();
  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const setSelectedTicketList = (ticket: any) => {
    dispatch(setSelectedTicketLists<any>(ticket));
  };

  const ticketsListsColumnPersist = ticketsListsColumnDynamic(
    router,
    lazyGetTicketsStatus?.data?.data?.tickets,
    selectedTicketLists,
    setSelectedTicketList,
  );

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());

  return {
    lazyGetTicketsStatus,
    handleSetPageLimit,
    handleSetPage,
    getTicketsListData,
    page,
    ticketsListsColumnPersist,
    ticketsListsActiveColumn,
    decrement,
    increment,
  };
};
