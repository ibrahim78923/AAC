import { useState, useEffect } from 'react';
import {
  TICKETS_ACTION_CONSTANTS,
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
import { downloadFile } from '@/utils/file';

export const useTicketsLists: any = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTicketList, setSelectedTicketList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [search, setSearch] = useState<any>('');
  const [columnNames, setColumnNames] = useState(ticketsListTotalColumns);
  const [ticketsFilter, setTicketsFilter] = useState<any>([]);

  const theme = useTheme();
  const router = useRouter();

  const getTicketsParam = new URLSearchParams();

  columnNames?.forEach(
    (col: any) => getTicketsParam?.append('columnNames', col),
  );
  ticketsFilter.forEach(([k, v]: any) => getTicketsParam?.append(k, v));
  getTicketsParam?.append('page', page + '');
  getTicketsParam?.append('limit', pageLimit + '');
  getTicketsParam?.append('search', search);

  const getTicketsParameter = {
    queryParams: getTicketsParam,
  };

  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetTicketsQuery();

  const [lazyGetExportTicketsTrigger, lazyGetExportTicketsStatus] =
    useLazyGetExportTicketsQuery();

  const getValueTicketsListData = async () => {
    try {
      const response =
        await lazyGetTicketsTrigger(getTicketsParameter).unwrap();
      enqueueSnackbar('Tickets Retrieved successfully', { variant: 'success' });
      return response;
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: 'error',
      });
    }
  };
  const getTicketsListDataExport = async (type: any) => {
    const exportTicketsParams = new URLSearchParams();
    exportTicketsParams?.append('assetType', 'services');
    exportTicketsParams?.append('impact', 'low');
    exportTicketsParams?.append('exportType', type);

    const getTicketsExportParameter = {
      queryParams: exportTicketsParams,
    };

    try {
      const response: any = await lazyGetExportTicketsTrigger(
        getTicketsExportParameter,
      ).unwrap();

      const FILE_TYPE: any = {
        CSV: 'text/csv',
        XLS: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };

      downloadFile(response, 'TicketLists', FILE_TYPE?.[type]);

      enqueueSnackbar('Tickets Exported successfully', { variant: 'success' });
      return response;
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    getValueTicketsListData();
  }, [columnNames, search, page, pageLimit, ticketsFilter]);

  useEffect(() => {
    if (!isDrawerOpen) {
      //TODO: destructing as i do not need that in rest queries.
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { ticketAction, ...restQueries } = router?.query;
      router?.push({
        pathname: router?.pathname,
        query: {
          ...restQueries,
        },
      });
    }
  }, []);
  const ticketsListsColumnPersist = ticketsListsColumnFunction(
    theme,
    router,
    lazyGetTicketsStatus?.data?.data?.tickets,
    selectedTicketList,
    setSelectedTicketList,
  );

  const drawerComponent: any = {
    [TICKETS_ACTION_CONSTANTS?.CUSTOMIZE_COLUMN]: (
      <CustomizeTicketsColumn
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        ticketsListsColumnPersist={ticketsListsColumnPersist}
        setColumnNames={setColumnNames}
        columnNames={columnNames}
      />
    ),

    [TICKETS_ACTION_CONSTANTS?.FILTER_DATA]: (
      <TicketsFilter
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        setTicketsFilter={setTicketsFilter}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.CREATE_NEW_TICKET]: (
      <CreateTicket
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.EDIT_TICKET]: (
      <CreateTicket
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        ticketId={selectedTicketList?.[0]}
      />
    ),
  };

  const openDrawer = (ticketActionQuery: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        ...router?.query,
        ticketAction: ticketActionQuery,
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
    openDrawer,
    selectedTicketList,
  );

  return {
    isDrawerOpen,
    router,
    openDrawer,
    TICKETS_ACTION_CONSTANTS,
    drawerComponent,
    ticketsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
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
    pageLimit,
    setPageLimit,
  };
};
