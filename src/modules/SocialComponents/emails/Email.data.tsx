import { GmailIcon, OutlookIcon } from '@/assets/icons';
import { END_POINTS } from '@/routesConstants/endpoints';

export const emailsDataArray = [
  {
    icon: <GmailIcon />,
    label: 'Gmail',
    navigate: END_POINTS?.CONVERSATION_GOOGLE_EMAIL_VIEW,
  },
  {
    icon: <OutlookIcon />,
    label: 'Microsoft Outlook',
    navigate: END_POINTS?.CONVERSATION_OUTLOOK_EMAIL_VIEW,
  },
];
