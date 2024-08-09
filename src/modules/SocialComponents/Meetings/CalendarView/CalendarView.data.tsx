import { CALENDER_TYPES } from '@/constants/strings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Theme } from '@mui/material';

export const meetingCardArray = (theme: Theme, status: any) => [
  {
    id: 3543,
    heading: 'All',
    type: 'allMeetings',
    meetingsCount: status?.data?.allMeetings ?? 0,
    color: theme?.palette?.info?.main,
  },
  {
    id: 8476,
    heading: 'Upcoming',
    type: 'upComming',
    meetingsCount: status?.data?.upCommings ?? 0,
    color: theme?.palette?.error?.main,
  },
  {
    id: 8210,
    heading: 'Completed',
    type: 'completed',
    meetingsCount: status?.data?.completed ?? 0,
    color: theme?.palette?.success?.dark,
  },
];

export const calendarButtons = [
  {
    id: 5575,
    type: CALENDER_TYPES?.DAY_VIEW_CALENDER,
    icon: <CalendarTodayIcon />,
    label: 'Today',
  },
  {
    id: 9009,
    type: CALENDER_TYPES?.WEEK_VIEW_CALENDER,
    icon: <DateRangeIcon />,
    label: 'Weekly',
  },
  {
    id: 7887,
    type: CALENDER_TYPES?.MONTH_VIEW_CALENDER,
    icon: <CalendarMonthIcon />,
    label: 'Monthly',
  },
  {
    id: 7569,
    type: CALENDER_TYPES?.YEAR_VIEW_CALENDER,
    icon: <EventAvailableIcon />,
    label: 'Yearly',
  },
];
