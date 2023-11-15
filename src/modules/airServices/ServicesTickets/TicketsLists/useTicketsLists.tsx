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
import { enqueueSnackbar } from 'notistack';
import {
  useLazyGetExportTicketsQuery,
  useLazyGetTicketsQuery,
  usePatchBulkUpdateTicketsMutation,
} from '@/services/airServices/tickets';
import { downloadFile } from '@/utils/file';
import { UpsertTicket } from '../UpsertTicket';
import { EXPORT_TYPE } from '@/constants/strings';

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
  ticketsFilter?.forEach(
    ([key, value]: any) => getTicketsParam?.append(key, value),
  );
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

  const [patchBulkUpdateTicketsTrigger] = usePatchBulkUpdateTicketsMutation();

  const getValueTicketsListData = async () => {
    try {
      const response =
        await lazyGetTicketsTrigger(getTicketsParameter)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Tickets Retrieved successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: 'error',
      });
    }
  };

  const getTicketsListDataExport = async (type: any) => {
    const exportTicketsParams = new URLSearchParams();

    exportTicketsParams?.append('exportType', type);

    const getTicketsExportParameter = {
      queryParams: exportTicketsParams,
    };

    try {
      const response: any = await lazyGetExportTicketsTrigger(
        getTicketsExportParameter,
      )?.unwrap();

      const FILE_TYPE: any = {
        [EXPORT_TYPE?.CSV]: 'text/csv',
        [EXPORT_TYPE?.XLS]:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };

      downloadFile(response, 'TicketLists', FILE_TYPE?.[type]);

      enqueueSnackbar(response?.message ?? 'Tickets Exported successfully', {
        variant: 'success',
      });
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

  const updateTicketStatus = async (status: any) => {
    const updateTicketStatusParams = new URLSearchParams();
    selectedTicketList?.forEach(
      (ticketId: any) => updateTicketStatusParams?.append('ids', ticketId),
    );
    const updateTicketStatusTicketsParameter = {
      queryParams: updateTicketStatusParams,
      body: {
        status,
      },
    };
    try {
      const response: any = await patchBulkUpdateTicketsTrigger(
        updateTicketStatusTicketsParameter,
      )?.unwrap();
      enqueueSnackbar(
        response?.message ?? `Ticket marked as ${status?.toLowerCase()}`,
        {
          variant: 'success',
        },
      );
    } catch (error: any) {
      enqueueSnackbar(error?.data?.error ?? 'Error', {
        variant: 'error',
      });
    }
  };
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
      <UpsertTicket
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.EDIT_TICKET]: (
      <UpsertTicket
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
      setIsDrawerOpen?.(true);
    }, 100);
  };

  const ticketsActionDropdown = ticketsActionDropdownFunction?.(
    setDeleteModalOpen,
    openDrawer,
    selectedTicketList,
    updateTicketStatus,
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
