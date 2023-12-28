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
import {
  useLazyGetExportTicketsQuery,
  useLazyGetTicketsQuery,
  usePatchBulkUpdateTicketsMutation,
} from '@/services/airServices/tickets';

export const useTicketsLists: any = () => {
  const [hasTicketAction, setHasTicketAction] = useState(false);
  const [selectedTicketList, setSelectedTicketList] = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [ticketsListsActiveColumn, setTicketsListsActiveColumn] = useState(
    ticketsListInitialColumns,
  );
  const [filterTicketLists, setFilterTicketLists] = useState<any>({});

  const theme = useTheme();
  const router = useRouter();
  const { makePath } = usePath();
  const getTicketsParam = new URLSearchParams();

  Object?.entries(filterTicketLists || {})?.forEach(
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
      await lazyGetTicketsTrigger(getTicketsParameter)?.unwrap();
      setSelectedTicketList([]);
    } catch (error: any) {
      error?.data?.data?.message &&
        enqueueSnackbar(error?.data?.message ?? 'Error', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      setSelectedTicketList([]);
    }
  };
  const getTicketsListDataExport = async (type: any) => {
    const exportTicketsParams = new URLSearchParams();

    exportTicketsParams?.append('exportType', type);
    exportTicketsParams?.append('page', page + '');
    exportTicketsParams?.append('limit', pageLimit + '');
    exportTicketsParams?.append('search', search);
    const getTicketsExportParameter = {
      queryParams: exportTicketsParams,
    };

    try {
      const response: any = await lazyGetExportTicketsTrigger(
        getTicketsExportParameter,
      )?.unwrap();
      downloadFile(response, 'TicketLists', EXPORT_FILE_TYPE?.[type]);
      enqueueSnackbar(
        response?.data?.message ?? `Tickets Exported successfully`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      setSelectedTicketList([]);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? `Tickets not exported`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      setSelectedTicketList([]);
    }
  };

  useEffect(() => {
    getValueTicketsListData();
  }, [search, page, pageLimit, filterTicketLists]);

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
        isDrawerOpen={hasTicketAction}
        setIsDrawerOpen={setHasTicketAction}
        ticketsListsColumnPersist={ticketsListsColumnPersist}
        setTicketsListsActiveColumn={setTicketsListsActiveColumn}
        ticketsListsActiveColumn={ticketsListsActiveColumn}
      />
    ),

    [TICKETS_ACTION_CONSTANTS?.FILTER_DATA]: (
      <TicketsFilter
        setIsDrawerOpen={setHasTicketAction}
        isDrawerOpen={hasTicketAction}
        setFilterTicketLists={setFilterTicketLists}
        filterTicketLists={filterTicketLists}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.CREATE_NEW_TICKET]: (
      <UpsertTicket
        setIsDrawerOpen={setHasTicketAction}
        isDrawerOpen={hasTicketAction}
        setSelectedTicketList={setSelectedTicketList}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.EDIT_TICKET]: (
      <UpsertTicket
        setIsDrawerOpen={setHasTicketAction}
        isDrawerOpen={hasTicketAction}
        ticketId={selectedTicketList?.[0]}
        setSelectedTicketList={setSelectedTicketList}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.BULK_UPDATE_DATA]: (
      <TicketsBulkUpdate
        setIsDrawerOpen={setHasTicketAction}
        isDrawerOpen={hasTicketAction}
        ticketId={selectedTicketList?.[0]}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.ASSIGNED_TICKET]: (
      <AssignedTickets
        setIsAssignedModalOpen={setHasTicketAction}
        isAssignedModalOpen={hasTicketAction}
        selectedTicketList={selectedTicketList}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.MOVE_TICKET]: (
      <MoveTickets
        setIsMoveTicketsModalOpen={setHasTicketAction}
        isMoveTicketsModalOpen={hasTicketAction}
        selectedTicketList={selectedTicketList}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.MERGE_TICKET]: (
      <MergeTickets
        setIsMergedTicketsModalOpen={setHasTicketAction}
        isMergedTicketsModalOpen={hasTicketAction}
        selectedTicketList={selectedTicketList}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.DELETE_TICKET]: (
      <TicketsDelete
        deleteModalOpen={hasTicketAction}
        setDeleteModalOpen={setHasTicketAction}
        selectedTicketList={selectedTicketList}
        setSelectedTicketList={setSelectedTicketList}
      />
    ),
  };

  const setTicketAction = (ticketActionQuery: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        ...router?.query,
        ticketAction: ticketActionQuery,
      },
    });
    setTimeout(() => {
      setHasTicketAction?.(true);
    }, 100);
  };

  const ticketsActionDropdown = ticketsActionDropdownFunction?.(
    setTicketAction,
    selectedTicketList,
    updateTicketStatus,
  );

  return {
    hasTicketAction,
    router,
    setTicketAction,
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
    ticketsListsActiveColumn,
    selectedTicketList,
    pageLimit,
    setPageLimit,
    setTicketsListsActiveColumn,
    getValueTicketsListData,
    setSelectedTicketList,
  };
};
