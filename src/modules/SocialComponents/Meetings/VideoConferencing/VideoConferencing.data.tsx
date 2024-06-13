import { GoogleMeetIcon, MSTeamsIcon, ZoomIcon } from '@/assets/icons';

export const GOOGLE_MEET = 'google_meet';
export const MS_TEAMS = 'ms_teams';
export const ZOOM = 'zoom';

export const videoConferencingData = [
  {
    id: 0,
    name: 'MS Teams',
    description:
      'Include Teams conferencing details in your Air Applecart events',
    icon: MSTeamsIcon,
  },
  {
    id: 1,
    name: 'Zoom',
    description:
      'Zoom allows one-to-one chat sessions that can grow into group calls, training sessions and webinars for ....',
    icon: ZoomIcon,
  },
  {
    id: 2,
    name: 'Google Meet',
    description:
      'Streamline the invitation process with Air Apple Cart Google Meet integration.',
    icon: GoogleMeetIcon,
  },
];

export const meetingsAccounts = (account: any) => [
  {
    id: 11,
    icon: account?.platform === MS_TEAMS && MSTeamsIcon,
    name: account?.platform === MS_TEAMS && 'Google Calendar',
  },
  {
    id: 22,
    icon: account?.platform === ZOOM && ZoomIcon,
    name: account?.platform === ZOOM && 'Office 365 Calendar',
  },
  {
    id: 23,
    icon: account?.platform === GOOGLE_MEET && GoogleMeetIcon,
    name: account?.platform === GOOGLE_MEET && 'Office 365 Calendar',
  },
];
