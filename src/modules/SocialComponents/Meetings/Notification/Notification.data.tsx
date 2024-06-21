import {
  BlockQuoteIcon,
  MessageNotificationIcon,
  NotificationBellIcon,
} from '@/assets/icons';

export const meetingsNotificationDataDynamic = () => [
  {
    id: 1,
    avatar: <MessageNotificationIcon />,
    type: 'Email',
    purpose: 'Get an email notification whenever  an event is scheduled',
  },
  {
    id: 2,
    avatar: <BlockQuoteIcon />,
    type: 'Text Reminder',
    purpose: 'Get a text reminder whenever an event is scheduled',
  },
  {
    id: 3,
    avatar: <NotificationBellIcon />,
    type: 'Email Reminder',
    purpose: 'Get an Email reminder whenever an event is scheduled',
  },
];
