import {
  DeliveredSmsIcon,
  FailedSmsIcon,
  ReadSmsIcon,
  SentSmsIcon,
} from '@/assets/icons';

export const smsStatusArray = () => {
  return [
    {
      icon: <SentSmsIcon />,
      count: 25,
      title: 'Sent',
      divider: true,
    },
    {
      icon: <DeliveredSmsIcon />,
      count: 30,
      title: 'Delivered',
      divider: true,
    },
    {
      icon: <ReadSmsIcon />,
      count: 47,
      title: 'Read',
      divider: true,
    },
    {
      icon: <FailedSmsIcon />,
      count: 10,
      title: 'Failed',
    },
  ];
};
