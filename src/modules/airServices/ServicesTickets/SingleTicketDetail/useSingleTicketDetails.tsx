import { useRouter } from 'next/router';
import { useGetTicketsByIdQuery } from '@/services/airServices/tickets';
import {
  singleTicketDetailDropdownOptionsDynamic,
  singleTicketDetailTabsDynamic,
} from './SingleTicketDetails.data';
import { useRef, useState } from 'react';
import { TicketsDelete } from '../TicketsDelete';
import { UpdateTicketStatus } from '../UpdateTicketStatus';
import { TICKETS_ACTION_CONSTANTS } from '../TicketsLists/TicketsLists.data';
import { PrintTicket } from '../PrintTicket';
import { EmailTicket } from '../EmailTicket';
import { TIME_ENTRIES_TICKETS_TIMES } from '@/constants/strings';

export const useSingleTicketDetails = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [isTimerPause, setIsTimerPause] = useState(true);

  const startTimerId = useRef();
  const intervalRef = useRef<number | null>(null);

  const [time, setTime] = useState({
    hours: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_HOUR,
    minutes: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_MINUTE,
    seconds: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_SECOND,
  });

  const router = useRouter();
  const { ticketId } = router?.query;

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError } = useGetTicketsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

  const singleTicketDetailDropdownOptions =
    singleTicketDetailDropdownOptionsDynamic(setIsPortalOpen);

  const portalComponentProps = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    selectedTicketList: [ticketId],
    isMoveBack: true,
    data,
    isTimerPause,
    setIsTimerPause,
  };

  const childComponentProps = {
    isTimerPause,
    setIsTimerPause,
    data,
    time,
    setTime,
    startTimerId,
    intervalRef,
  };

  const renderPortalComponent = {
    [TICKETS_ACTION_CONSTANTS?.DELETE_TICKET]: (
      <TicketsDelete {...portalComponentProps} />
    ),
    [TICKETS_ACTION_CONSTANTS?.UPDATE_TICKET_STATUS]: (
      <UpdateTicketStatus {...portalComponentProps} />
    ),
    [TICKETS_ACTION_CONSTANTS?.PRINT_TICKET]: (
      <PrintTicket {...portalComponentProps} />
    ),
    [TICKETS_ACTION_CONSTANTS?.EMAIL_TICKET]: (
      <EmailTicket {...portalComponentProps} />
    ),
  };

  const singleTicketDetailTabs =
    singleTicketDetailTabsDynamic?.(childComponentProps);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    ticketId,
    singleTicketDetailDropdownOptions,
    renderPortalComponent,
    isPortalOpen,
    setIsPortalOpen,
    portalComponentProps,
    childComponentProps,
    singleTicketDetailTabs,
  };
};
