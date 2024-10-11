import { PAGINATION } from '@/config';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import {
  emptySelectedTicketLists,
  resetTotalCountLoading,
  setTotalCount,
  setTotalCountLoading,
} from '@/redux/slices/airServices/related-tickets/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useLazyGetServicesRelatedTicketsListQuery } from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { useRouter } from 'next/router';

export const useGetRelatedTicketList = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;

  const page = useAppSelector((state) => state?.servicesRelatedTickets?.page);

  const pageLimit = useAppSelector(
    (state) => state?.servicesRelatedTickets?.pageLimit,
  );

  const dispatch = useAppDispatch();

  const [lazyGetChildTicketsTrigger, lazyGetChildTicketsStatus] =
    useLazyGetServicesRelatedTicketsListQuery();

  const getChildTicketsListData = async (currentPage = page) => {
    const getChildTicketsParam = {
      page: currentPage,
      limit: pageLimit,
    };
    const getChildTicketsParameter = {
      queryParams: getChildTicketsParam,
      pathParam: {
        id: ticketId,
      },
    };

    try {
      dispatch(setTotalCountLoading());
      const response = await lazyGetChildTicketsTrigger(
        getChildTicketsParameter,
      )?.unwrap();
      const totalNoOfRecords =
        response?.data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
          ? response?.data?.meta?.total
          : !!response?.data?.tickets?.[ARRAY_INDEX?.ZERO]?.childTicketDetails
                ?._id
            ? response?.data?.meta?.total
            : PAGINATION?.TOTAL_RECORDS;
      dispatch(setTotalCount<any>(totalNoOfRecords));
      dispatch(emptySelectedTicketLists());
    } catch (error: any) {
      dispatch(setTotalCount<any>(0));
      dispatch(emptySelectedTicketLists());
    }
    dispatch(resetTotalCountLoading());
  };

  const data = lazyGetChildTicketsStatus?.data?.data;
  const totalRelatedTickets =
    data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
      ? data?.tickets
      : !!data?.tickets?.[ARRAY_INDEX?.ZERO]?.childTicketDetails?._id
        ? data?.tickets
        : [];
  const currentPage =
    data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
      ? data?.meta?.page
      : !!data?.tickets?.[ARRAY_INDEX?.ZERO]?.childTicketDetails?._id
        ? data?.meta?.page
        : SELECTED_ARRAY_LENGTH?.ZERO;
  const count =
    data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
      ? data?.meta?.pages
      : !!data?.tickets?.[ARRAY_INDEX?.ZERO]?.childTicketDetails?._id
        ? data?.meta?.pages
        : SELECTED_ARRAY_LENGTH?.ZERO;
  const totalPages =
    data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
      ? data?.meta?.total
      : !!data?.tickets?.[ARRAY_INDEX?.ZERO]?.childTicketDetails?._id
        ? data?.meta?.total
        : PAGINATION?.TOTAL_RECORDS;
  const pageSize = data?.meta?.limit;

  return {
    getChildTicketsListData,
    lazyGetChildTicketsStatus,
    page,
    pageLimit,
    totalRelatedTickets,
    count,
    totalPages,
    currentPage,
    pageSize,
  };
};
