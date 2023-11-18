import { useState, useEffect } from 'react';
import {
  TICKETS_ACTION_CONSTANTS,
  ticketsActionDropdownFunction,
  ticketsListInitialColumns,
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
import { EXPORT_FILE_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import { TicketsBulkUpdate } from '../TicketsBulkUpdate';
import { AssignedTickets } from '../AssignedTickets';
import { MoveTickets } from '../MoveTickets';
import { MergeTickets } from '../MergeTickets';
import { TicketsDelete } from '../TicketsDelete';
import usePath from '@/hooks/usePath';
import { PAGINATION } from '@/config';

export const useTicketsLists: any = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicketList, setSelectedTicketList] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [columnNames, setColumnNames] = useState(ticketsListInitialColumns);
  const [ticketsFilter, setTicketsFilter] = useState<any>([]);

  const theme = useTheme();
  const router = useRouter();
  const { makePath } = usePath();
  const getTicketsParam = new URLSearchParams();

  ticketsFilter?.forEach(
    ([key, value]: any) => getTicketsParam?.append(key, value),
  );
  getTicketsParam?.append('columnNames', '*');
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
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
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
      downloadFile(response, 'TicketLists', EXPORT_FILE_TYPE?.[type]);
      enqueueSnackbar(
        response?.data?.message ?? 'Tickets Exported successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Tickets not exported', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  //TODO: we will be used while doing BE integration
  // useEffect(() => {
  //   getValueTicketsListData();
  // }, [search, page, pageLimit, ticketsFilter]);

  useEffect(() => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
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
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(
        error?.data?.error?.message ??
          `Ticket not marked as ${status?.toLowerCase()}`,
        {
          variant: NOTISTACK_VARIANTS?.ERROR,
        },
      );
    }
  };
  const ticketsListsColumnPersist = ticketsListsColumnFunction(
    theme,
    router,
    lazyGetTicketsStatus?.data?.data?.tickets,
    selectedTicketList,
    setSelectedTicketList,
  );

  const ticketActionComponent: any = {
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
    [TICKETS_ACTION_CONSTANTS?.BULK_UPDATE_DATA]: (
      <TicketsBulkUpdate
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        ticketId={selectedTicketList?.[0]}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.ASSIGNED_TICKET]: (
      <AssignedTickets
        setIsAssignedModalOpen={setIsModalOpen}
        isAssignedModalOpen={isModalOpen}
        selectedTicketList={selectedTicketList}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.MOVE_TICKET]: (
      <MoveTickets
        setIsMoveTicketsModalOpen={setIsModalOpen}
        isMoveTicketsModalOpen={isModalOpen}
        selectedTicketList={selectedTicketList}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.MERGE_TICKET]: (
      <MergeTickets
        setIsMergedTicketsModalOpen={setIsModalOpen}
        isMergedTicketsModalOpen={isModalOpen}
        selectedTicketList={selectedTicketList}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.DELETE_TICKET]: (
      <TicketsDelete
        deleteModalOpen={isModalOpen}
        setDeleteModalOpen={setIsModalOpen}
        selectedTicketList={selectedTicketList}
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

  const openModal = (ticketActionQuery: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        ...router?.query,
        ticketAction: ticketActionQuery,
      },
    });
    setTimeout(() => {
      setIsModalOpen?.(true);
    }, 100);
  };

  const ticketsActionDropdown = ticketsActionDropdownFunction?.(
    openDrawer,
    selectedTicketList,
    updateTicketStatus,
    openModal,
  );

  return {
    isDrawerOpen,
    router,
    openDrawer,
    TICKETS_ACTION_CONSTANTS,
    ticketActionComponent,
    ticketsActionDropdown,
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
    isModalOpen,
    setColumnNames,
    getValueTicketsListData,
  };
};
