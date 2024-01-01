import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material';
import {
  useDeleteChildTicketsMutation,
  useGetChildTicketsQuery,
} from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { useSearchParams } from 'next/navigation';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { columnsFunction } from './RelatedTickets.data';
import { PAGINATION } from '@/config';

export const useRelatedTickets = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const ticketId = useSearchParams()?.get('ticketId');

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [drawerType, setDrawerType] = useState<string>('Add');
  const [selectedChildTickets, setSelectedChildTickets] = useState<any>([]);
  const { data, isLoading, isError } = useGetChildTicketsQuery({
    id: ticketId,
  });

  const metaData: any = {
    ...data,
    isLoading,
    isError,
    tickets:
      data?.data?.tickets?.map?.((ticket: any) => ticket?.childTicketDetails) ??
      [],
  };

  const [deleteChildTickets] = useDeleteChildTicketsMutation();
  const handleDeleteChildTickets = async () => {
    try {
      const getChildTicketsParam = new URLSearchParams();
      selectedChildTickets?.forEach(
        ({ _id }: any) => getChildTicketsParam?.append('ids', _id),
      );
      await deleteChildTickets(getChildTicketsParam)?.unwrap();
      enqueueSnackbar('child ticket deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

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
    setActionExportPop(event.currentTarget);
  };

  const handleActionExportClose = () => {
    setActionExportPop(null);
  };

  const openActionExport = Boolean(actionExportPop);

  const relatedTicketsColumns = columnsFunction(
    metaData?.tickets,
    setIsDrawerOpen,
    selectedChildTickets,
    setSelectedChildTickets,
    theme,
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
    handleDeleteChildTickets,
  });

  return {
    enqueueSnackbar,
    setIsDrawerOpen,
    isDrawerOpen,
    drawerType,
    setDrawerType,
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
    handleDeleteChildTickets,
    relatedTicketsColumns,
    headerFunctions,
    metaData,
    page,
    setPage,
    pageLimit,
    setPageLimit,
  };
};
