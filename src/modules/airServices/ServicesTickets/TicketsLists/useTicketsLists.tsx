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

import { downloadFile } from '@/utils/file';
import { UpsertTicket } from '../UpsertTicket';
import { EXPORT_FILE_TYPE, VIEW_TYPES } from '@/constants/strings';
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
  usePutSingleTicketStatusMutation,
} from '@/services/airServices/tickets';
import { FilterTickets } from '../FilterTickets';
import { neglectKeysInLoop } from '../FilterTickets/FilterTickets.data';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';
import { getActivePermissionsSession } from '@/utils';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';

export const useTicketsLists: any = () => {
  const [hasTicketAction, setHasTicketAction] = useState(false);
  const [selectedTicketList, setSelectedTicketList] = useState([]);
  const overallPermissions = getActivePermissionsSession();
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

  const additionalParams = [
    ['metaData', true + ''],
    ['page', page + ''],
    ['limit', pageLimit + ''],
    ['search', search],
  ];
  const ticketsParam = buildQueryParams(
    additionalParams,
    filterTicketLists,
    neglectKeysInLoop,
  );
  const getTicketsParameter = {
    queryParams: ticketsParam,
  };

  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetTicketsQuery();

  const [lazyGetExportTicketsTrigger, lazyGetExportTicketsStatus] =
    useLazyGetExportTicketsQuery();

  const [putSingleTicketStatusTrigger] = usePutSingleTicketStatusMutation();

  const getValueTicketsListData = async () => {
    try {
      await lazyGetTicketsTrigger(getTicketsParameter)?.unwrap();
      setSelectedTicketList([]);
    } catch (error: any) {
      setSelectedTicketList([]);
    }
  };

  const getTicketsListDataExport = async (type: any) => {
    const additionalParams = [
      ['metaData', true + ''],
      ['page', page + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ['exportType', type],
    ];
    const ticketsParam = buildQueryParams(
      additionalParams,
      filterTicketLists,
      neglectKeysInLoop,
    );

    const getTicketsExportParameter = {
      queryParams: ticketsParam,
    };

    try {
      const response: any = await lazyGetExportTicketsTrigger(
        getTicketsExportParameter,
      )?.unwrap();
      downloadFile(response, 'TicketLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`Tickets Exported successfully`);
      setSelectedTicketList([]);
    } catch (error: any) {
      errorSnackbar?.();
      setSelectedTicketList([]);
    }
  };

  useEffect(() => {
    getValueTicketsListData();
  }, [search, page, pageLimit, filterTicketLists]);

  useEffect(() => {
    if (
      overallPermissions?.includes(
        AIR_SERVICES_TICKETS_TICKET_LISTS?.TICKETS_LIST_VIEW,
      )
    ) {
      router?.push(
        makePath({
          path: router?.pathname,
          skipQueries: ['ticketAction'],
        }),
      );
      return;
    }
    if (
      overallPermissions?.includes(
        AIR_SERVICES_TICKETS_TICKET_LISTS?.BOARD_VIEW,
      )
    ) {
      router?.push(
        makePath({
          path: router?.pathname,
          skipQueries: ['ticketAction'],
          queryParams: { viewType: VIEW_TYPES?.BOARD },
        }),
      );
      return;
    }
  }, []);

  const updateTicketStatus = async (status: any) => {
    const updateTicketStatusTicketsParameter = {
      pathParams: { id: selectedTicketList?.[0] },
      queryParams: {
        status,
      },
    };
    try {
      await putSingleTicketStatusTrigger(
        updateTicketStatusTicketsParameter,
      )?.unwrap();
      successSnackbar('Ticket status updated successfully');
      setSelectedTicketList([]);
    } catch (error: any) {
      errorSnackbar();
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
      <FilterTickets
        setIsDrawerOpen={setHasTicketAction}
        isDrawerOpen={hasTicketAction}
        setFilterTicketLists={setFilterTicketLists}
        filterTicketLists={filterTicketLists}
        setPage={setPage}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.CREATE_NEW_TICKET]: (
      <UpsertTicket
        setIsDrawerOpen={setHasTicketAction}
        isDrawerOpen={hasTicketAction}
        setSelectedTicketList={setSelectedTicketList}
        setFilterTicketLists={setFilterTicketLists}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.EDIT_TICKET]: (
      <UpsertTicket
        setIsDrawerOpen={setHasTicketAction}
        isDrawerOpen={hasTicketAction}
        ticketId={selectedTicketList?.[0]}
        setSelectedTicketList={setSelectedTicketList}
        setFilterTicketLists={setFilterTicketLists}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.BULK_UPDATE_DATA]: (
      <TicketsBulkUpdate
        setIsDrawerOpen={setHasTicketAction}
        isDrawerOpen={hasTicketAction}
        selectedTicketList={selectedTicketList}
        setSelectedTicketList={setSelectedTicketList}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.ASSIGNED_TICKET]: (
      <AssignedTickets
        setIsAssignedModalOpen={setHasTicketAction}
        isAssignedModalOpen={hasTicketAction}
        selectedTicketList={selectedTicketList}
        setSelectedTicketList={setSelectedTicketList}
        singleTicketDetail={lazyGetTicketsStatus?.data?.data?.tickets?.find(
          (singleTicket: any) => singleTicket?._id === selectedTicketList?.[0],
        )}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.MOVE_TICKET]: (
      <MoveTickets
        setIsMoveTicketsModalOpen={setHasTicketAction}
        isMoveTicketsModalOpen={hasTicketAction}
        selectedTicketList={selectedTicketList}
        setSelectedTicketList={setSelectedTicketList}
        singleTicketDetail={lazyGetTicketsStatus?.data?.data?.tickets?.find(
          (singleTicket: any) => singleTicket?._id === selectedTicketList?.[0],
        )}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.MERGE_TICKET]: (
      <MergeTickets
        setIsMergedTicketsModalOpen={setHasTicketAction}
        isMergedTicketsModalOpen={hasTicketAction}
        selectedTicketList={selectedTicketList}
        setSelectedTicketList={setSelectedTicketList}
        singleTicketDetail={lazyGetTicketsStatus?.data?.data?.tickets?.find(
          (singleTicket: any) => singleTicket?._id === selectedTicketList?.[0],
        )}
      />
    ),
    [TICKETS_ACTION_CONSTANTS?.DELETE_TICKET]: (
      <TicketsDelete
        deleteModalOpen={hasTicketAction}
        setDeleteModalOpen={setHasTicketAction}
        selectedTicketList={selectedTicketList}
        setSelectedTicketList={setSelectedTicketList}
        setPage={setPage}
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
    filterTicketLists,
  };
};
