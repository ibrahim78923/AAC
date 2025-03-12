import { ARRAY_INDEX, MODULE_TYPE } from '@/constants/strings';
import { NextRouter, useRouter } from 'next/router';
import { singleTicketDetailDropdownOptionsDynamic } from './Header.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsPortalOpen,
  setSelectedTicketLists,
} from '@/redux/slices/airServices/tickets/slice';

import { TICKETS_ACTION_CONSTANTS } from '../../TicketsLists/TicketsListHeader/TicketListHeader.data';
import {
  AIR_SERVICES,
  QUICK_LINKS,
  SOCIAL_COMPONENTS,
} from '@/constants/routes';
import dynamic from 'next/dynamic';
import LazyLoadingFlow from '@/components/LazyLoadingFlow';

const UpdateTicketStatus = dynamic(() => import('../../UpdateTicketStatus'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="update ticket status"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const PrintTicket = dynamic(() => import('../../PrintTicket'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="print ticket"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const EmailTicket = dynamic(() => import('../../EmailTicket'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="email ticket"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const TicketsDelete = dynamic(() => import('../../TicketsDelete'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="delete ticket"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

export const useHeader = (props: any) => {
  const { data } = props;

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );

  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const { ticketId } = router?.query;

  const ticketDetail = data?.data?.[ARRAY_INDEX?.ZERO];

  const moveBack = () => router?.push(AIR_SERVICES?.TICKETS);

  const moveToMeetings = () => {
    router?.push({
      pathname: SOCIAL_COMPONENTS?.SCHEDULE_MEETING,
      query: {
        moduleId: ticketId,
        moduleType: MODULE_TYPE?.TICKET,
      },
    });
  };

  const moveToCall = () => router?.push(QUICK_LINKS?.CALLING);

  const setTicketAction = (
    ticketActionQuery: string,
    ticketStatus: { [key: string]: any } = {},
  ) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: ticketActionQuery,
        status: ticketStatus,
      }),
    );
    dispatch(setSelectedTicketLists<any>(data?.data));
  };

  const openEmailPortal = () => {
    setTicketAction?.(TICKETS_ACTION_CONSTANTS?.EMAIL_TICKET);
  };

  const singleTicketDetailDropdownOptions =
    singleTicketDetailDropdownOptionsDynamic(setTicketAction);

  const renderPortalComponent = {
    [TICKETS_ACTION_CONSTANTS?.DELETE_TICKET]: <TicketsDelete />,
    [TICKETS_ACTION_CONSTANTS?.UPDATE_TICKET_STATUS]: <UpdateTicketStatus />,
    [TICKETS_ACTION_CONSTANTS?.PRINT_TICKET]: <PrintTicket />,
    [TICKETS_ACTION_CONSTANTS?.EMAIL_TICKET]: <EmailTicket />,
  };

  return {
    ticketId,
    moveBack,
    moveToMeetings,
    moveToCall,
    openEmailPortal,
    singleTicketDetailDropdownOptions,
    ticketDetail,
    isPortalOpen,
    renderPortalComponent,
  };
};
