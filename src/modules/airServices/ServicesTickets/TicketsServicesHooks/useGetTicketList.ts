import {
  useLazyGetExportTicketsQuery,
  useLazyGetTicketsQuery,
} from '@/services/airServices/tickets';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';
import { neglectKeysInLoop } from '../FilterTickets/FilterTickets.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setTicketsListsTotalRecords,
} from '@/redux/slices/airServices/tickets/slice';
import { downloadFile } from '@/utils/file';
import { EXPORT_FILE_TYPE } from '@/constants/strings';

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
    useLazyGetTicketsQuery();

  const [lazyGetExportTicketsTrigger, lazyGetExportTicketsStatus] =
    useLazyGetExportTicketsQuery();

  const prepareQueryParams = (params: any) => {
    const additionalParams = [
      ['metaData', true + ''],
      ['page', params?.currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ...(!!params?.type ? [['exportType', params?.type]] : []),
    ];
    const ticketsParam = buildQueryParams(
      additionalParams,
      params?.filtered,
      neglectKeysInLoop,
    );
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

  const getTicketsListDataExport = async (type: any) => {
    const params = {
      currentPage: page,
      filtered: filterTicketLists,
      type,
    };
    const ticketsParam = prepareQueryParams?.(params);
    const getTicketsParameter = {
      queryParams: ticketsParam,
    };

    try {
      const response =
        await lazyGetExportTicketsTrigger(getTicketsParameter)?.unwrap();
      downloadFile(response, 'TicketLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`Tickets Exported successfully`);
      dispatch(emptySelectedTicketLists());
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
    getTicketsListDataExport,
    lazyGetExportTicketsStatus,
  };
};
