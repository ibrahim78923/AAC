import {
  BlockQuoteIcon,
  MessageNotificationIcon,
  NotificationBellIcon,
} from '@/assets/icons';
import { NOTIFICATIONS_TYPES } from '@/constants/strings';

export const meetingsNotificationDataDynamic = () => [
  {
    id: 1,
    enum: NOTIFICATIONS_TYPES?.MEETING_EMAIL,
    avatar: <MessageNotificationIcon />,
    type: 'Email',
    purpose: 'Get an email notification whenever  an event is scheduled',
  },
  {
    id: 2,
    enum: NOTIFICATIONS_TYPES?.MEETING_SMS_REMINDER,
    avatar: <BlockQuoteIcon />,
    type: 'Text Reminder',
    purpose: 'Get a text reminder whenever an event is scheduled',
  },
  {
    id: 3,
    enum: NOTIFICATIONS_TYPES?.MEETING_EMAIL_REMINDER,
    avatar: <NotificationBellIcon />,
    type: 'Email Reminder',
    purpose: 'Get an Email reminder whenever an event is scheduled',
  },
];
