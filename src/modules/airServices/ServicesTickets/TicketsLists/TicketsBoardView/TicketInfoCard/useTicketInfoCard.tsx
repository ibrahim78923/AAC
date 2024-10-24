import { DATE_FORMAT } from '@/constants';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  setIsPortalOpen,
  setSelectedTicketLists,
} from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch } from '@/redux/store';
import { singleTicketBoardViewDropdownOptionsDynamic } from '../TicketsBoardView.data';
import { nowDate, parsedDateFormat } from '@/lib/date-time';

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

    if (timeDiff < 0) {
      message = `${messagePassed} ${date?.format(DATE_FORMAT?.UI)}`;
    } else if (timeDiff < 24) {
      message = `${messageDue} ${timeDiff}h`;
    } else {
      const timeDiffDays = date?.diff(now, 'day');
      if (timeDiffDays <= 30) {
        message = `${messageDue} ${timeDiffDays} day(s)`;
      } else {
        message = `${messageDue} ${date?.format(DATE_FORMAT?.UI)}`;
      }
    }
    return message;
  };

  const now = nowDate();
  const resolvedAt = parsedDateFormat(details?.resolvedAt);
  const closedAt = parsedDateFormat(details?.closedAt);
  const plannedEndDate = parsedDateFormat(details?.plannedEndDate);
  // Open Status
  const openTimeDiff = plannedEndDate?.diff(now, 'hour');
  const openMessage = timeFormatMessage(
    openTimeDiff,
    plannedEndDate,
    'Was Due Till',
    'Due in',
  );

  // Resolved Status
  const resolvedTimeDiff = resolvedAt?.diff(now, 'hour');
  const resolvedMessage = timeFormatMessage(
    resolvedTimeDiff,
    plannedEndDate,
    'Resolved:',
    'Resolved:',
  );

  // Pending Status
  const pendingTimeDiff = plannedEndDate?.diff(now, 'hour');
  const pendingMessage = timeFormatMessage(
    pendingTimeDiff,
    plannedEndDate,
    'Was Due Till',
    'Due in',
  );

  // Closed Status
  const closedTimeDiff = closedAt?.diff(now, 'hour');
  const closedMessage = timeFormatMessage(
    closedTimeDiff,
    plannedEndDate,
    'Closed:',
    'Closed:',
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
    resolvedMessage,
    pendingMessage,
    closedMessage,
    singleTicketBoardViewDropdownOptions,
  };
};

export default useTicketInfoCard;
