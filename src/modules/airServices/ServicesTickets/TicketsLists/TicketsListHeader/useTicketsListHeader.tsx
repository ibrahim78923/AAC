import {
  TICKETS_ACTION_CONSTANTS,
  ticketsActionDropdownDynamic,
} from './TicketListHeader.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsPortalOpen,
  setSearch,
  setTicketsListsInitialColumn,
} from '@/redux/slices/airServices/tickets/slice';
import { PAGINATION } from '@/config';
import { VIEW_TYPES } from '@/constants/strings';
import { NextRouter, useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  servicesTicketsIsPortalOpenSelector,
  servicesTicketsSelectedTicketListsSelector,
} from '@/redux/slices/airServices/tickets/selectors';

const UpsertTicket = dynamic(() => import('../../UpsertTicket'), {
  ssr: false,
});

const TicketsBulkUpdate = dynamic(() => import('../../TicketsBulkUpdate'), {
  ssr: false,
});

const AssignedTickets = dynamic(() => import('../../AssignedTickets'), {
  ssr: false,
});

const MergeTickets = dynamic(() => import('../../MergeTickets'), {
  ssr: false,
});

const MoveTickets = dynamic(() => import('../../MoveTickets'), {
  ssr: false,
});

const UpdateTicketStatus = dynamic(() => import('../../UpdateTicketStatus'), {
  ssr: false,
});

const FilterTickets = dynamic(() => import('../../FilterTickets'), {
  ssr: false,
});

const CustomizeTicketsColumn = dynamic(
  () => import('../../CustomizeTicketsColumn'),
  {
    ssr: false,
  },
);

const TicketsDelete = dynamic(() => import('../../TicketsDelete'), {
  ssr: false,
});

export const useTicketsListHeader = () => {
  const router: NextRouter = useRouter();
  const { makePath } = usePath();
  const isPortalOpen = useAppSelector(servicesTicketsIsPortalOpenSelector);

  const selectedTicketLists = useAppSelector(
    servicesTicketsSelectedTicketListsSelector,
  );

  const dispatch = useAppDispatch();

  const ticketActionComponent = useMemo(
    () => ({
      [TICKETS_ACTION_CONSTANTS?.CUSTOMIZE_COLUMN]: <CustomizeTicketsColumn />,
      [TICKETS_ACTION_CONSTANTS?.FILTER_DATA]: <FilterTickets />,
      [TICKETS_ACTION_CONSTANTS?.CREATE_NEW_TICKET]: <UpsertTicket />,
      [TICKETS_ACTION_CONSTANTS?.EDIT_TICKET]: <UpsertTicket />,
      [TICKETS_ACTION_CONSTANTS?.BULK_UPDATE_DATA]: <TicketsBulkUpdate />,
      [TICKETS_ACTION_CONSTANTS?.ASSIGNED_TICKET]: <AssignedTickets />,
      [TICKETS_ACTION_CONSTANTS?.MOVE_TICKET]: <MoveTickets />,
      [TICKETS_ACTION_CONSTANTS?.MERGE_TICKET]: <MergeTickets />,
      [TICKETS_ACTION_CONSTANTS?.DELETE_TICKET]: <TicketsDelete />,
      [TICKETS_ACTION_CONSTANTS?.UPDATE_TICKET_STATUS]: <UpdateTicketStatus />,
    }),
    [],
  );

  const setTicketAction = (
    ticketActionQuery: string,
    data: { [key: string]: any } = {},
  ) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: ticketActionQuery,
        status: data?.status,
      }),
    );
  };

  const ticketsActionDropdown = useMemo(
    () => ticketsActionDropdownDynamic(setTicketAction, selectedTicketLists),
    [selectedTicketLists],
  );

  const handleSetSearch = (newSearch: any) => {
    dispatch(
      setSearch<any>({ searchTerm: newSearch, page: PAGINATION?.CURRENT_PAGE }),
    );
  };

  const setInitialColumns = () => {
    dispatch(setTicketsListsInitialColumn());
  };

  const renderBoardView = () => {
    router?.push({
      pathname: router?.pathname,
      query: {
        ...router?.query,
        viewType: VIEW_TYPES?.BOARD,
      },
    });
  };

  const renderTableView = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['viewType'],
      }),
    );
  };

  return {
    ticketsActionDropdown,
    isPortalOpen,
    ticketActionComponent,
    setTicketAction,
    handleSetSearch,
    selectedTicketLists,
    setInitialColumns,
    renderTableView,
    renderBoardView,
    router,
  };
};
