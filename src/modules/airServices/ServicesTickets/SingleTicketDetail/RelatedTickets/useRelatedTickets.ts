import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetChildTicketsQuery } from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import {
  columnsFunction,
  relatedTicketsActionDropdownFunction,
} from './RelatedTickets.data';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';

export const useRelatedTickets = (props: any) => {
  const { setTotalRelatedTickets } = props;
  const theme = useTheme();
  const router = useRouter();
  const ticketId = router?.query?.ticketId;

  const [isDelete, setIsDelete] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [selectedChildTickets, setSelectedChildTickets] = useState<any>([]);

  const getTicketsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
    },
    pathParam: {
      id: ticketId,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetChildTicketsQuery(getTicketsParameter, {
      refetchOnMountOrArgChange: true,
    });

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

  const relatedTicketsActionDropdown = relatedTicketsActionDropdownFunction(
    setIsDelete,
    selectedChildTickets,
    setIsDrawerOpen,
  );

  useEffect(() => {
    setTotalRelatedTickets(
      data?.data?.tickets?.length > 1
        ? data?.data?.meta?.total
        : !!data?.data?.tickets?.[0]?.childTicketDetails?._id
          ? data?.data?.meta?.total
          : 0,
    );
    return () => setTotalRelatedTickets('');
  }, [data]);

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
    setTotalRelatedTickets,
  };
};
