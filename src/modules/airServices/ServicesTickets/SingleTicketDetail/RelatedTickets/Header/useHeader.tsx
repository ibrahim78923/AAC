import {
  RELATED_TICKET_ACTIONS_CONSTANT,
  relatedTicketsActionDropdownDynamic,
} from './Header.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalOpen } from '@/redux/slices/airServices/related-tickets/slice';

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesRelatedTickets?.isPortalOpen,
  );

  const selectedRelatedTicketLists = useAppSelector(
    (state) => state?.servicesRelatedTickets?.selectedRelatedTicketLists,
  );

  const setTicketAction = (ticketActionQuery: string) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: ticketActionQuery,
      }),
    );
  };

  const openCreateChildTicket = () =>
    setTicketAction?.(RELATED_TICKET_ACTIONS_CONSTANT?.CREATE_RELATED_TICKET);

  const relatedTicketsActionDropdown = relatedTicketsActionDropdownDynamic?.(
    setTicketAction,
    selectedRelatedTicketLists,
  );

  return {
    isPortalOpen,
    openCreateChildTicket,
    relatedTicketsActionDropdown,
    selectedRelatedTicketLists,
  };
};
