import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useLazyGetChildTicketsQuery } from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import {
  columnsFunction,
  relatedTicketsActionDropdownFunction,
} from './RelatedTickets.data';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { buildQueryParams } from '@/utils/api';

export const useRelatedTickets = () => {
  const theme = useTheme();
  const router = useRouter();
  const ticketId = router?.query?.ticketId;
  const [isDelete, setIsDelete] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [selectedChildTickets, setSelectedChildTickets] = useState<any>([]);
  const [
    lazyGetChildTicketsTrigger,
    { data, isLoading, isFetching, isError, isSuccess },
  ] = useLazyGetChildTicketsQuery<any>();

  const getChildTicketsListData = async (currentPage: any = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
    ];

    const getChildTicketsParam: any = buildQueryParams(additionalParams);

    const getChildTicketsParameter = {
      queryParams: getChildTicketsParam,
      pathParam: {
        id: ticketId,
      },
    };

    try {
      await lazyGetChildTicketsTrigger(getChildTicketsParameter)?.unwrap();
      setSelectedChildTickets([]);
    } catch (error: any) {}
  };
  const relatedTicketsColumns = columnsFunction(
    data?.data?.tickets?.length > 1
      ? data?.data?.tickets
      : !!data?.data?.tickets?.[0]?.childTicketDetails?._id
        ? data?.data?.tickets
        : [],
    selectedChildTickets,
    setSelectedChildTickets,
    theme,
    router,
  );
  useEffect(() => {
    getChildTicketsListData();
  }, [page, pageLimit]);

  const relatedTicketsActionDropdown = relatedTicketsActionDropdownFunction(
    setIsDelete,
    selectedChildTickets,
    setIsDrawerOpen,
  );

  return {
    setIsDrawerOpen,
    isDrawerOpen,
    selectedChildTickets,
    relatedTicketsColumns,
    setPage,
    setPageLimit,
    setSelectedChildTickets,
    relatedTicketsActionDropdown,
    isDelete,
    setIsDelete,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    getChildTicketsListData,
    page,
  };
};
