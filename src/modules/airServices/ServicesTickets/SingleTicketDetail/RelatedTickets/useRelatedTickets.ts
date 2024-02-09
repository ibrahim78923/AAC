import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useLazyGetChildTicketsQuery } from '@/services/airServices/tickets/single-ticket-details/related-tickets';
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
  const [lazyGetChildTicketsTrigger, lazyGetChildTicketsStatus] =
    useLazyGetChildTicketsQuery();

  const getValueChildTicketsListData = async () => {
    try {
      const response =
        await lazyGetChildTicketsTrigger(getTicketsParameter)?.unwrap();
      setTotalRelatedTickets(response?.data?.meta?.total);
      setSelectedChildTickets([]);
    } catch (error: any) {
      setSelectedChildTickets([]);
    }
  };

  useEffect(() => {
    getValueChildTicketsListData();
  }, [page, pageLimit, ticketId]);

  const relatedTicketsColumns = columnsFunction(
    lazyGetChildTicketsStatus?.data?.data?.tickets,
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

  return {
    setIsDrawerOpen,
    isDrawerOpen,
    selectedChildTickets,
    relatedTicketsColumns,
    setPage,
    lazyGetChildTicketsStatus,
    setPageLimit,
    setSelectedChildTickets,
    relatedTicketsActionDropdown,
    isDelete,
    setIsDelete,
  };
};
