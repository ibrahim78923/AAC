import { GoogleMeetIcon, MSTeamsIcon, ZoomIcon } from '@/assets/icons';
import { PROJECT_NAME } from '@/config';

export const GOOGLE_MEET = 'google_meet';
export const MS_TEAMS = 'ms_teams';
export const ZOOM = 'zoom';

export const videoConferencingData = [
  {
    id: 0,
    name: 'MS Teams',
    description: `Include Teams conferencing details in your ${PROJECT_NAME} events`,
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
    description: `Streamline the invitation process with ${PROJECT_NAME} Google Meet integration.`,
    icon: GoogleMeetIcon,
  },
];

export const meetingsAccounts = (account: any) => [
  {
    id: 11,
    icon: account?.platform === MS_TEAMS && MSTeamsIcon,
    name: account?.platform === MS_TEAMS && 'MS Teams',
  },
  {
    id: 22,
    icon: account?.platform === ZOOM && ZoomIcon,
    name: account?.platform === ZOOM && 'Zoom',
  },
  {
    id: 23,
    icon: account?.platform === GOOGLE_MEET && GoogleMeetIcon,
    name: account?.platform === GOOGLE_MEET && 'Google Meet',
  },
];
