import { useEffect } from 'react';
import { useGetTicketList } from '../../TicketsServicesHooks/useGetTicketList';
import { useAppDispatch } from '@/redux/store';
import {
  setPage,
  setPageDecrement,
  setPageIncrement,
  setPageLimit,
} from '@/redux/slices/airServices/tickets/slice';

export const useTicketsBoardView = () => {
  const {
    getTicketsListData,
    lazyGetTicketsStatus,
    page,
    pageLimit,
    search,
    filterTicketLists,
  } = useGetTicketList();

  useEffect(() => {
    getTicketsListData?.();
  }, [page, pageLimit, search, filterTicketLists]);

  const HEAD_STATUS = [
    { heading: 'Open', be: 'OPEN' },
    { heading: 'Resolved', be: 'RESOLVED' },
    { heading: 'Pending', be: 'PENDING' },
    { heading: 'Closed', be: 'CLOSED' },
  ];

  const dispatch = useAppDispatch();

  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());

  return {
    HEAD_STATUS,
    lazyGetTicketsStatus,
    page,
    handleSetPageLimit,
    handleSetPage,
    getTicketsListData,
    decrement,
    increment,
  };
};
