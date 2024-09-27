import {
  DeliveredSmsIcon,
  FailedSmsIcon,
  ReadSmsIcon,
  SentSmsIcon,
} from '@/assets/icons';

export const smsStatusArray = (whatsappAnalytics: any) => {
  return [
    {
      icon: <SentSmsIcon />,
      count: whatsappAnalytics?.delivered + whatsappAnalytics?.failed,
      title: 'Sent',
      divider: true,
    },
    {
      icon: <DeliveredSmsIcon />,
      count: whatsappAnalytics?.delivered,
      title: 'Delivered',
      divider: true,
    },
    {
      icon: <ReadSmsIcon />,
      count: whatsappAnalytics?.read,
      title: 'Read',
      divider: true,
    },
    {
      icon: <FailedSmsIcon />,
      count: whatsappAnalytics?.failed,
      title: 'Failed',
    },
  ];
};
