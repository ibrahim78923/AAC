import { NextRouter, useRouter } from 'next/router';
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
import { ARRAY_INDEX, TIME_ENTRIES_TICKETS_TIMES } from '@/constants/strings';
import {
  SingleTicketDetailChildComponentPropsI,
  SingleTicketDetailIsPortalOpenI,
  SingleTicketDetailPortalComponentPropsI,
  TimeI,
} from './SingleTicketDetails.interface';

export const useSingleTicketDetails = () => {
  const [isPortalOpen, setIsPortalOpen] =
    useState<SingleTicketDetailIsPortalOpenI>({});
  const [isTimerPause, setIsTimerPause] = useState<boolean>(true);

  const startTimerId = useRef();
  const intervalRef = useRef<number | null>(null);

  const [time, setTime] = useState<TimeI>({
    hours: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_HOUR,
    minutes: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_MINUTE,
    seconds: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_SECOND,
  });

  const router: NextRouter = useRouter();
  const { ticketId } = router?.query;

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetTicketsByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });
  const ticketDetail = data?.data?.[ARRAY_INDEX?.ZERO];
  const singleTicketDetailDropdownOptions =
    singleTicketDetailDropdownOptionsDynamic(setIsPortalOpen);

  const portalComponentProps: SingleTicketDetailPortalComponentPropsI = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    selectedTicketList: [ticketId as string],
    isMoveBack: true,
    data,
    isTimerPause,
    setIsTimerPause,
  };

  const childComponentProps: SingleTicketDetailChildComponentPropsI = {
    isTimerPause,
    setIsTimerPause,
    data,
    time,
    setTime,
    startTimerId,
    intervalRef,
    refetch,
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
    childComponentProps,
    singleTicketDetailTabs,
    refetch,
    ticketDetail,
  };
};
