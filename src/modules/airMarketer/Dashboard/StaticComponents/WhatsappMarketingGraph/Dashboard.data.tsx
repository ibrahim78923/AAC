import {
  DeliveredSmsIcon,
  FailedSmsIcon,
  ReadSmsIcon,
  SentSmsIcon,
} from '@/assets/icons';

export const smsStatusArray = (data: any) => {
  return [
    {
      icon: <SentSmsIcon />,
      count: data?.sent ?? 0,
      title: 'Sent',
      divider: true,
    },
    {
      icon: <DeliveredSmsIcon />,
      count: data?.delivered ?? 0,
      title: 'Delivered',
      divider: true,
    },
    {
      icon: <ReadSmsIcon />,
      count: data?.read ?? 0,
      title: 'Read',
      divider: true,
    },
    {
      icon: <FailedSmsIcon />,
      count: data?.failed ?? 0,
      title: 'Failed',
    },
  ];
};
