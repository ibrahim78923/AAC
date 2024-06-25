import { GoogleCalenderIcon, OfficeCalenderIcon } from '@/assets/icons';

export const GOOGLE_ACCOUNTS = 'google_calendar';
export const MICROSOFT_ACCOUNTS = 'office_365_calendar';

export const calendarServices = [
  {
    id: 1,
    icon: GoogleCalenderIcon,
    name: 'Google Calendar',
    description:
      "Connect your calendar to let people know when you're available and update your calendar as events are scheduled.",
  },
  {
    id: 2,
    icon: OfficeCalenderIcon,
    name: 'Office 365 Calendar',
    description:
      "Connect your calendar to let people know when you're available and update your calendar as events are scheduled.",
  },
];

export const calendarAccounts = (account: any) => [
  {
    id: 11,
    icon: account?.platform === GOOGLE_ACCOUNTS && GoogleCalenderIcon,
    name: account?.platform === GOOGLE_ACCOUNTS && 'Google Calendar',
    email: 'Rabilibra275@gmail.com',
  },
  {
    id: 22,
    icon: account?.platform === MICROSOFT_ACCOUNTS && OfficeCalenderIcon,
    name: account?.platform === MICROSOFT_ACCOUNTS && 'Office 365 Calendar',
    email: 'Rabilibra275@gmail.com',
  },
];

export const calenderType = {
  google: 'Google Calendar',
  office: 'Office 365 Calendar',
};
