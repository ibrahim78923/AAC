import { useState, useEffect } from 'react';
import {
  TABLE_CONSTANTS,
  ticketsActionDropdownFunction,
  ticketsListTotalColumns,
  ticketsListsColumnFunction,
  // ticketsListsData,
} from './TicketsLists.data';
import { CustomizeTicketsColumn } from '../CustomizeTicketsColumn';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { TicketsFilter } from '../TicketsFilter';
import CreateTicket from '../CreateTicket';
import { enqueueSnackbar } from 'notistack';
import { useLazyGetTicketsQuery } from '@/services/airServices/tickets';

export const useTicketsLists: any = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTicketList, setSelectedTicketList] = useState();

  const [search] = useState<any>('');
  const [columnNames] = useState(ticketsListTotalColumns);

  const theme = useTheme();
  const router = useRouter();

  const params = new URLSearchParams();
  columnNames?.forEach((col: any) => params?.append('columnNames', col));
  params?.append('page', 1 + '');
  params?.append('limit', 10 + '');
  params?.append('search', search);

  const getTicketsParameter = {
    queryParams: params,
  };

  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetTicketsQuery();

  const getValueTicketsListData = async () => {
    try {
      const response =
        await lazyGetTicketsTrigger(getTicketsParameter).unwrap();
      const object2 = Object?.entries(response?.data?.tickets[0] ?? {})?.reduce(
        (x: any, y: any) => {
          const [k] = y;
          return { ...x, [k]: true };
        },
        {},
      );
      const newColumns = ticketsListsColumnPersist?.filter(
        (x: any) => object2[x?.id],
      );
      // console.log(newColumns);
      setTicketsListsColumn(newColumns);
      return response;
    } catch (error) {
      // console.log(error);
      enqueueSnackbar('Error', { variant: 'error' });
    }
  };

  useEffect(() => {
    getValueTicketsListData();
  }, []);

  const ticketsListsColumnPersist = ticketsListsColumnFunction(
    theme,
    router,
    lazyGetTicketsStatus?.data?.data?.tickets,
    selectedTicketList,
    setSelectedTicketList,
  );

  const [ticketsListsColumn, setTicketsListsColumn] = useState();
  const drawerComponent: any = {
    [TABLE_CONSTANTS?.CUSTOMIZE_COLUMN]: (
      <CustomizeTicketsColumn
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        ticketsListsColumnPersist={ticketsListsColumnPersist}
        ticketsListsColumn={ticketsListsColumn}
        setTicketsListsColumn={setTicketsListsColumn}
      />
    ),

    [TABLE_CONSTANTS?.FILTER_DATA]: (
      <TicketsFilter
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    ),
    [TABLE_CONSTANTS?.CREATE_NEW_TICKET]: (
      <CreateTicket
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    ),
  };

  const openDrawer = (tableActionQuery: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        ...router?.query,
        tableAction: tableActionQuery,
      },
    });
    setTimeout(() => {
      setIsDrawerOpen(true);
    }, 100);
  };

  const markTicketAsClose = () => {
    enqueueSnackbar('Ticket marked as close', { variant: 'success' });
  };

  const markTicketAsSpam = () => {
    enqueueSnackbar('Ticket marked as spam', { variant: 'success' });
  };

  const deleteTicket = () => {
    enqueueSnackbar('Ticket deleted successfully', { variant: 'success' });
    setDeleteModalOpen(false);
  };

  const ticketsActionDropdown = ticketsActionDropdownFunction?.(
    setDeleteModalOpen,
    markTicketAsClose,
    markTicketAsSpam,
  );
  // console.log({ lazyGetTicketsStatus });
  return {
    isDrawerOpen,
    router,
    openDrawer,
    TABLE_CONSTANTS,
    drawerComponent,
    ticketsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    deleteTicket,
    ticketsListsColumn,
    lazyGetTicketsStatus,
  };
};
