import { useState, useEffect } from 'react';
import {
  TICKETS_ACTION_CONSTANTS,
  ticketsActionDropdownFunction,
  ticketsListInitialColumns,
  ticketsListsColumnFunction,
} from './TicketsLists.data';
import { CustomizeTicketsColumn } from '../CustomizeTicketsColumn';
import { useRouter } from 'next/router';

import { downloadFile } from '@/utils/file';
import { UpsertTicket } from '../UpsertTicket';
import { ARRAY_INDEX, EXPORT_FILE_TYPE, VIEW_TYPES } from '@/constants/strings';
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
import {
  TicketActionComponentI,
  TicketActionComponentPropsI,
} from './TicketsLists.interface';

export const useTicketsLists: any = () => {
  const [hasTicketAction, setHasTicketAction] = useState<boolean>(false);
  const [selectedTicketList, setSelectedTicketList] = useState([]);
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [ticketsListsActiveColumn, setTicketsListsActiveColumn] = useState<
    string[]
  >(ticketsListInitialColumns);
  const [filterTicketLists, setFilterTicketLists] = useState<any>({});

  const overallPermissions = getActivePermissionsSession();
  const router = useRouter();
  const { makePath } = usePath();

  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetTicketsQuery();

  const [lazyGetExportTicketsTrigger, lazyGetExportTicketsStatus] =
    useLazyGetExportTicketsQuery();

  const [putSingleTicketStatusTrigger, putSingleTicketStatusStatus] =
    usePutSingleTicketStatusMutation();

  const getValueTicketsListData = async (
    currentPage = page,
    filtered = filterTicketLists,
  ) => {
    const additionalParams = [
      ['metaData', true + ''],
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
    ];
    const ticketsParam = buildQueryParams(
      additionalParams,
      filtered,
      neglectKeysInLoop,
    );
    const getTicketsParameter = {
      queryParams: ticketsParam,
    };
    try {
      await lazyGetTicketsTrigger(getTicketsParameter)?.unwrap();
      setSelectedTicketList([]);
    } catch (error: any) {
      setSelectedTicketList([]);
    }
  };

  const getTicketsListDataExport = async (type: string) => {
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
      const response = await lazyGetExportTicketsTrigger(
        getTicketsExportParameter,
      )?.unwrap();
      downloadFile(response, 'TicketLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`Tickets Exported successfully`);
      setSelectedTicketList([]);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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

  const updateTicketStatus = async (status: string) => {
    const updateTicketStatusTicketsParameter = {
      queryParams: {
        status,
        id: selectedTicketList?.[ARRAY_INDEX?.ZERO],
      },
    };
    try {
      await putSingleTicketStatusTrigger(
        updateTicketStatusTicketsParameter,
      )?.unwrap();
      successSnackbar('Ticket status updated successfully');
      setSelectedTicketList([]);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const ticketsListsColumnPersist = ticketsListsColumnFunction(
    router,
    lazyGetTicketsStatus?.data?.data?.tickets,
    selectedTicketList,
    setSelectedTicketList,
  );

  const ticketActionComponentProps: TicketActionComponentPropsI = {
    setIsDrawerOpen: setHasTicketAction,
    isDrawerOpen: hasTicketAction,
    selectedTicketList: selectedTicketList,
    setSelectedTicketList: setSelectedTicketList,
    singleTicketDetail: lazyGetTicketsStatus?.data?.data?.tickets?.find(
      (singleTicket: any) =>
        singleTicket?._id === selectedTicketList?.[ARRAY_INDEX?.ZERO],
    ),
    getTicketsListData: getValueTicketsListData,
    setFilterTicketLists: setFilterTicketLists,
    filterTicketLists: filterTicketLists,
    setPage: setPage,
    ticketsListsColumnPersist: ticketsListsColumnPersist,
    setTicketsListsActiveColumn: setTicketsListsActiveColumn,
    ticketsListsActiveColumn: ticketsListsActiveColumn,
    ticketId: selectedTicketList?.[ARRAY_INDEX?.ZERO],
    totalRecords: lazyGetTicketsStatus?.data?.data?.tickets?.length,
    page: page,
  };

  const ticketActionComponent: TicketActionComponentI = {
    [TICKETS_ACTION_CONSTANTS?.CUSTOMIZE_COLUMN]: (
      <CustomizeTicketsColumn {...ticketActionComponentProps} />
    ),

    [TICKETS_ACTION_CONSTANTS?.FILTER_DATA]: (
      <FilterTickets {...ticketActionComponentProps} />
    ),
    [TICKETS_ACTION_CONSTANTS?.CREATE_NEW_TICKET]: (
      <UpsertTicket {...ticketActionComponentProps} />
    ),
    [TICKETS_ACTION_CONSTANTS?.EDIT_TICKET]: (
      <UpsertTicket {...ticketActionComponentProps} />
    ),
    [TICKETS_ACTION_CONSTANTS?.BULK_UPDATE_DATA]: (
      <TicketsBulkUpdate {...ticketActionComponentProps} />
    ),
    [TICKETS_ACTION_CONSTANTS?.ASSIGNED_TICKET]: (
      <AssignedTickets {...ticketActionComponentProps} />
    ),
    [TICKETS_ACTION_CONSTANTS?.MOVE_TICKET]: (
      <MoveTickets {...ticketActionComponentProps} />
    ),
    [TICKETS_ACTION_CONSTANTS?.MERGE_TICKET]: (
      <MergeTickets {...ticketActionComponentProps} />
    ),
    [TICKETS_ACTION_CONSTANTS?.DELETE_TICKET]: (
      <TicketsDelete {...ticketActionComponentProps} />
    ),
  };

  const setTicketAction = (ticketActionQuery: string) => {
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
    putSingleTicketStatusStatus,
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
