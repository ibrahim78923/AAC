import { useLazyGetServicesTicketsListQuery } from '@/services/airServices/tickets';
import { buildQueryParams } from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setTicketsListsTotalRecords,
} from '@/redux/slices/airServices/tickets/slice';

export const useGetTicketList = () => {
  const page = useAppSelector((state) => state?.servicesTickets?.page);
  const pageLimit = useAppSelector(
    (state) => state?.servicesTickets?.pageLimit,
  );
  const search = useAppSelector((state) => state?.servicesTickets?.search);
  const filterTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.filterTicketLists,
  );
  const dispatch = useAppDispatch();
  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetServicesTicketsListQuery();

  const prepareQueryParams = (params: any) => {
    const additionalParams = [
      ['metaData', true + ''],
      ['page', params?.currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
    ];
    const ticketsParam = buildQueryParams(additionalParams, params?.filtered);
    return ticketsParam;
  };

  const getTicketsListData = async (
    currentPage: number = page,
    filtered = filterTicketLists,
  ) => {
    const params = {
      currentPage,
      filtered,
    };
    const ticketsParam = prepareQueryParams?.(params);
    const getTicketsParameter = {
      queryParams: ticketsParam,
    };

    try {
      const response =
        await lazyGetTicketsTrigger(getTicketsParameter)?.unwrap();
      dispatch(emptySelectedTicketLists());
      dispatch(setTicketsListsTotalRecords(response?.data?.tickets?.length));
    } catch (error: any) {
      dispatch(emptySelectedTicketLists());
    }
  };

  return {
    getTicketsListData,
    lazyGetTicketsStatus,
    page,
    pageLimit,
    search,
    filterTicketLists,
  };
};
