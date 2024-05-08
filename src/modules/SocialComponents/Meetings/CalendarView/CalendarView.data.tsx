import { CALENDER_TYPES } from '@/constants/strings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export const eventArray = [
  {
    title: 'Testing 1',
    start: '2024-04-10T12:30:00',
    end: '2024-04-10T13:30:00',
    data: {
      email: 'kamran.zafar@ceative.co.uk',
      meetingTitle: 'BA meeting',
      invitedBy: 'Waqas Ahmed',
      accepted: '3',
      notResponding: '33',
      listeners: 'Designers',
      attachment: 'HR module division.xlsx',
    },
  },
  {
    title: 'Testing 2',
    start: '2024-04-08T9:30:00',
    end: '2024-04-08T10:00:00',
    data: {
      email: 'ali.raza@ceative.co.uk',
      meetingTitle: 'Demo meeting',
      invitedBy: 'Umer Arshed',
      accepted: '3',
      notResponding: '33',
      listeners: 'Designers',
      attachment: 'BA module division.xlsx',
    },
  },
  {
    title: 'Testing 3',
    start: '2024-04-06T11:30:00',
    end: '2024-04-06T12:00:00',
    data: {
      email: 'umer.awan@ceative.co.uk',
      meetingTitle: 'Coordinator meeting',
      invitedBy: 'Ali Raza',
      accepted: '3',
      notResponding: '33',
      listeners: 'Managers',
      attachment: 'PM module division.xlsx',
    },
  },
  {
    title: 'Testing 4',
    start: '2024-04-23T14:30:00',
    end: '2024-04-23T15:30:00',
    data: {
      email: 'auns.ali@ceative.co.uk',
      meetingTitle: 'PM meeting',
      invitedBy: 'Faisal Naeem',
      accepted: '3',
      notResponding: '33',
      listeners: 'Coordinators',
      attachment: 'BD module division.xlsx',
    },
  },
  {
    title: 'Testing 5',
    start: '2024-04-29T14:30:00',
    end: '2024-04-29T15:00:00',
    data: {
      email: 'ahmer.raza@ceative.co.uk',
      meetingTitle: 'HR meeting',
      invitedBy: 'Muhammad Afaq',
      accepted: '3',
      notResponding: '33',
      listeners: 'Developers',
      attachment: 'FE module division.xlsx',
    },
  },
  {
    title: 'Testing 6',
    start: '2024-04-29T11:15:00',
    end: '2024-04-29T12:00:00',
    data: {
      email: 'ali.haider@ceative.co.uk',
      meetingTitle: 'Developer meeting',
      invitedBy: 'Ahsan Ali',
      accepted: '3',
      notResponding: '33',
      listeners: 'Management',
      attachment: 'BA module division.xlsx',
    },
  },
  {
    title: 'Testing 7',
    start: '2024-05-03T11:00:00',
    end: '2024-05-03T14:10:00',
    data: {
      email: 'ali.haider@ceative.co.uk',
      meetingTitle: 'Developer meeting',
      invitedBy: 'Ahsan Ali',
      accepted: '3',
      notResponding: '33',
      listeners: 'Management',
      attachment: 'BA module division.xlsx',
    },
  },
  {
    title: 'Testing 8',
    start: '2024-04-29T9:00:00',
    end: '2024-04-29T9:50:00',
    data: {
      email: 'ali.haider@ceative.co.uk',
      meetingTitle: 'Developer meeting',
      invitedBy: 'Ahsan Ali',
      accepted: '3',
      notResponding: '33',
      listeners: 'Management',
      attachment: 'BA module division.xlsx',
    },
  },
  {
    title: 'Testing 9',
    start: '2024-04-29T14:00:00',
    end: '2024-04-29T14:30:00',
    data: {
      email: 'ali.haider@ceative.co.uk',
      meetingTitle: 'Developer meeting',
      invitedBy: 'Ahsan Ali',
      accepted: '3',
      notResponding: '33',
      listeners: 'Management',
      attachment: 'BA module division.xlsx',
    },
  },
  {
    title: 'Testing 10',
    start: '2024-05-03T13:00:00',
    end: '2024-05-03T13:40:00',
    data: {
      email: 'ali.haider@ceative.co.uk',
      meetingTitle: 'Developer meeting',
      invitedBy: 'Ahsan Ali',
      accepted: '3',
      notResponding: '33',
      listeners: 'Management',
      attachment: 'BA module division.xlsx',
    },
  },
];

export const meetingCardArray = (theme: any) => [
  {
    id: 3543,
    heading: 'All',
    meetingsCount: '5',
    color: theme?.palette?.info?.main,
  },
  {
    id: 8476,
    heading: 'Upcoming',
    meetingsCount: '2',
    color: theme?.palette?.error?.main,
  },
  {
    id: 8210,
    heading: 'Completed',
    meetingsCount: '3',
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
