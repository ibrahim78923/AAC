import { useGetTicketTasksList } from '../../../TicketsServicesHooks/useGetTicketTasksList';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsPortalOpen,
  setPage,
  setPageDecrement,
  setPageIncrement,
  setPageLimit,
  setSelectedTicketTasksLists,
} from '@/redux/slices/airServices/tickets-tasks/slice';
import { ticketsTasksListsColumnsDynamic } from './TasksList.data';

export const useTasksList = () => {
  const dispatch = useAppDispatch();

  const { getTicketTasksListData, lazyGetTicketsTasksStatus, page, pageLimit } =
    useGetTicketTasksList?.();

  const selectedTicketTasksLists = useAppSelector(
    (state) => state?.servicesTicketTasks?.selectedTicketTasksLists,
  );

  useEffect(() => {
    getTicketTasksListData();
  }, [page, pageLimit]);

  const isLoading = lazyGetTicketsTasksStatus?.isLoading;
  const isError = lazyGetTicketsTasksStatus?.isError;
  const isFetching = lazyGetTicketsTasksStatus?.isFetching;
  const isSuccess = lazyGetTicketsTasksStatus?.isSuccess;
  const totalTicketTasks = lazyGetTicketsTasksStatus?.data?.data?.tasks;

  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const setSelectedTicketTaskList = (ticket: any) => {
    dispatch(setSelectedTicketTasksLists<any>(ticket));
  };

  const handlePageChange = (currentPage: number) => {
    handleSetPage?.(currentPage);
  };

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());

  const refetch = () => getTicketTasksListData?.(page);

  const setTicketTasksAction = (actionType: string, data?: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
        data,
      }),
    );
  };

  const ticketsTasksListsColumns = ticketsTasksListsColumnsDynamic(
    totalTicketTasks,
    selectedTicketTasksLists,
    setSelectedTicketTaskList,
    setTicketTasksAction,
  );

  const isApiCalled =
    !lazyGetTicketsTasksStatus?.data && !lazyGetTicketsTasksStatus?.error;

  return {
    ticketsTasksListsColumns,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    page,
    handleSetPage,
    handleSetPageLimit,
    totalTicketTasks,
    increment,
    decrement,
    handlePageChange,
    refetch,
    lazyGetTicketsTasksStatus,
    isApiCalled,
  };
};
