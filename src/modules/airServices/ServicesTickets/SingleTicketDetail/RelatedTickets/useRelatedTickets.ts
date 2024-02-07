import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
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
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const router = useRouter();
  const ticketId = router?.query?.ticketId;

  const [isDelete, setIsDelete] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [selectedChildTickets, setSelectedChildTickets] = useState<any>([]);

  const getTicketsParam = new URLSearchParams();
  getTicketsParam?.append('page', page + '');
  getTicketsParam?.append('limit', pageLimit + '');
  const getTicketsParameter = {
    queryParams: getTicketsParam,
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
      setTotalRelatedTickets(response?.data?.data?.meta?.pages);
      setSelectedChildTickets([]);
    } catch (error: any) {
      setSelectedChildTickets([]);
    }
  };

  useEffect(() => {
    getValueChildTicketsListData();
    return () => setTotalRelatedTickets('');
  }, [page, pageLimit]);

  const handleCheckboxChange = (event: any) => {
    setSelectedChildTickets(event?.target?.checked);
  };
  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);
  const [actionExportPop, setActionExportPop] =
    useState<HTMLButtonElement | null>(null);
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionPop(event?.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);

  const handleActionExportClick = (event: any) => {
    setActionExportPop(event?.currentTarget);
  };

  const handleActionExportClose = () => {
    setActionExportPop(null);
  };

  const openActionExport = Boolean(actionExportPop);

  const relatedTicketsColumns = columnsFunction(
    lazyGetChildTicketsStatus?.data?.data,
    selectedChildTickets,
    setSelectedChildTickets,
    theme,
    router,
  );

  const headerFunctions = () => ({
    handleActionClick,
    actionExportPop,
    actionPop,
    setActionPop,
    handleActionExportClose,
    openAction,
    handleActionExportClick,
    handleActionClose,
    openActionExport,
  });
  const relatedTicketsActionDropdown = relatedTicketsActionDropdownFunction(
    setIsDelete,
    selectedChildTickets,
    setIsDrawerOpen,
  );
  return {
    enqueueSnackbar,
    setIsDrawerOpen,
    isDrawerOpen,
    handleCheckboxChange,
    setSelectedChildTickets,
    selectedChildTickets,
    handleActionClick,
    actionExportPop,
    actionPop,
    setActionPop,
    handleActionExportClose,
    openAction,
    handleActionExportClick,
    handleActionClose,
    openActionExport,
    relatedTicketsColumns,
    headerFunctions,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    lazyGetChildTicketsStatus,
    ticketId,
    relatedTicketsActionDropdown,
    isDelete,
    setIsDelete,
  };
};
