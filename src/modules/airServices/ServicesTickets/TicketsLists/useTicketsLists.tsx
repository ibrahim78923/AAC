import { useState, useEffect } from 'react';
import {
  TABLE_CONSTANTS,
  ticketsActionDropdownFunction,
  ticketsListTotalColumns,
  ticketsListsColumnFunction,
} from './TicketsLists.data';
import { CustomizeTicketsColumn } from '../CustomizeTicketsColumn';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { TicketsFilter } from '../TicketsFilter';
import CreateTicket from '../CreateTicket';
import { enqueueSnackbar } from 'notistack';
import {
  useLazyGetExportTicketsQuery,
  useLazyGetTicketsQuery,
} from '@/services/airServices/tickets';

export const useTicketsLists: any = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTicketList, setSelectedTicketList] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<any>('');
  const [columnNames, setColumnNames] = useState(ticketsListTotalColumns);

  const theme = useTheme();
  const router = useRouter();

  const params = new URLSearchParams();
  columnNames?.forEach((col: any) => params?.append('columnNames', col));
  params?.append('page', page + '');
  params?.append('limit', 10 + '');
  params?.append('search', search);

  const getTicketsParameter = {
    queryParams: params,
  };
  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetTicketsQuery();
  const [lazyGetExportTicketsTrigger, lazyGetExportTicketsStatus] =
    useLazyGetExportTicketsQuery();

  const getValueTicketsListData = async () => {
    try {
      const response =
        await lazyGetTicketsTrigger(getTicketsParameter).unwrap();
      const checkingColumns = Object?.entries(
        response?.data?.tickets?.[0] ?? {},
      )?.reduce((x: any, y: any) => {
        const [k] = y;
        return { ...x, [k]: true };
      }, {});
      setTicketsListsColumn(checkingColumns);
      enqueueSnackbar('Tickets Retrieved successfully', { variant: 'success' });
      return response;
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: 'error',
      });
    }
  };
  const getTicketsListDataExport = async (type: any) => {
    const getTicketsExportParameter = {
      queryParams: {
        exportType: type,
      },
    };
    try {
      const response: any = await lazyGetExportTicketsTrigger(
        getTicketsExportParameter,
      ).unwrap();
      enqueueSnackbar('Tickets Exported successfully', { variant: 'success' });
      return response;
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: 'error',
      });
    }
  };
  const [ticketsListsColumn, setTicketsListsColumn] = useState();
  useEffect(() => {
    getValueTicketsListData();
  }, [columnNames, search, page]);

  const ticketsListsColumnPersist = ticketsListsColumnFunction(
    theme,
    router,
    lazyGetTicketsStatus?.data?.data?.tickets,
    selectedTicketList,
    setSelectedTicketList,
  );

  const drawerComponent: any = {
    [TABLE_CONSTANTS?.CUSTOMIZE_COLUMN]: (
      <CustomizeTicketsColumn
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        ticketsListsColumnPersist={ticketsListsColumnPersist}
        ticketsListsColumn={ticketsListsColumn}
        setTicketsListsColumn={setTicketsListsColumn}
        setColumnNames={setColumnNames}
        columnNames={columnNames}
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

  const ticketsActionDropdown = ticketsActionDropdownFunction?.(
    setDeleteModalOpen,
    markTicketAsClose,
    markTicketAsSpam,
  );
  return {
    isDrawerOpen,
    router,
    openDrawer,
    TABLE_CONSTANTS,
    drawerComponent,
    ticketsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    ticketsListsColumn,
    lazyGetTicketsStatus,
    ticketsListsColumnPersist,
    search,
    setSearch,
    page,
    setPage,
    getTicketsListDataExport,
    lazyGetExportTicketsStatus,
    columnNames,
    selectedTicketList,
  };
};
