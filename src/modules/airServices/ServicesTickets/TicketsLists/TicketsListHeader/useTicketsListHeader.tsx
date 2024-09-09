import { UpsertTicket } from '../../UpsertTicket';
import { TicketsBulkUpdate } from '../../TicketsBulkUpdate';
import { AssignedTickets } from '../../AssignedTickets';
import { MoveTickets } from '../../MoveTickets';
import { MergeTickets } from '../../MergeTickets';
import { TicketsDelete } from '../../TicketsDelete';
import { UpdateTicketStatus } from '../../UpdateTicketStatus';
import { FilterTickets } from '../../FilterTickets';
import { CustomizeTicketsColumn } from '../../CustomizeTicketsColumn';
import {
  TicketActionComponentI,
  TicketActionComponentPropsI,
} from '../TicketsLists.interface';
import { TICKETS_ACTION_CONSTANTS } from '../TicketsLists.data';
import { ticketsActionDropdownDynamic } from './TicketListHeader.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsPortalOpen,
  setSearch,
  setTicketsListsInitialColumn,
} from '@/redux/slices/airServices/tickets/slice';
import { useGetTicketList } from '../../TicketsServicesHooks/useGetTicketList';

export const useTicketsListHeader = () => {
  const { getTicketsListDataExport } = useGetTicketList();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );

  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );

  const dispatch = useAppDispatch();

  const ticketActionComponentProps: TicketActionComponentPropsI | any = {
    isPortalOpen,
    selectedTicketLists,
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
    [TICKETS_ACTION_CONSTANTS?.UPDATE_TICKET_STATUS]: (
      <UpdateTicketStatus {...ticketActionComponentProps} />
    ),
  };

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

  const ticketsActionDropdown = ticketsActionDropdownDynamic?.(
    setTicketAction,
    selectedTicketLists,
  );

  const handleSetSearch = (newSearch: any) => {
    dispatch(setSearch<any>({ searchTerm: newSearch, page: 1 }));
  };
  const setInitialColumns = () => {
    dispatch(setTicketsListsInitialColumn());
  };
  return {
    ticketsActionDropdown,
    isPortalOpen,
    ticketActionComponent,
    setTicketAction,
    handleSetSearch,
    selectedTicketLists,
    getTicketsListDataExport,
    setInitialColumns,
  };
};
