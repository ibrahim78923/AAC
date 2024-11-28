import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  setIsPortalOpen,
  setSelectedTicketLists,
} from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch } from '@/redux/store';
import {
  singleTicketBoardViewDropdownOptionsDynamic,
  TICKET_DUE_DATE_MESSAGES,
} from '../TicketsBoardView.data';
import { diffDateTime, localeDateTime, uiDateFormat } from '@/lib/date-time';

export const useTicketInfoCard = (props: any) => {
  const { details } = props;
  const dispatch = useAppDispatch();
  const theme: any = useTheme();

  const router = useRouter();

  const timeFormatMessage = (
    timeDiff: any,
    date: any,
    messagePassed: string,
    messageDue: string,
  ) => {
    let message;
    if (!date) return (message = 'Not Planned');
    if (timeDiff < 0) {
      message = `${messagePassed} ${uiDateFormat(date)}`;
    } else if (timeDiff < 24) {
      message = `${messageDue} ${timeDiff}h`;
    } else {
      const timeDiffDays = diffDateTime?.(date, 'day');
      if (timeDiffDays <= 30) {
        message = `${messageDue} ${timeDiffDays} day(s)`;
      } else {
        message = `${messageDue} ${uiDateFormat(date)}`;
      }
    }
    return message;
  };

  const plannedEndDate = details?.plannedEndDate
    ? localeDateTime(details?.plannedEndDate)
    : '';

  // Open Status
  const openTimeDiff = diffDateTime?.(plannedEndDate, 'hour');
  const openMessage = timeFormatMessage(
    openTimeDiff,
    plannedEndDate,
    TICKET_DUE_DATE_MESSAGES?.DUE_TILL,
    TICKET_DUE_DATE_MESSAGES?.DUE_UNTIL,
  );

  // Pending Status
  const pendingTimeDiff = diffDateTime?.(plannedEndDate, 'hour');
  const pendingMessage = timeFormatMessage(
    pendingTimeDiff,
    plannedEndDate,
    TICKET_DUE_DATE_MESSAGES?.DUE_TILL,
    TICKET_DUE_DATE_MESSAGES?.DUE_UNTIL,
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
    dispatch(setSelectedTicketLists<any>([data]));
  };
  const singleTicketBoardViewDropdownOptions = (detail: any) =>
    singleTicketBoardViewDropdownOptionsDynamic?.(setTicketAction, detail);

  return {
    theme,
    router,
    openMessage,
    pendingMessage,
    singleTicketBoardViewDropdownOptions,
  };
};

export default useTicketInfoCard;
