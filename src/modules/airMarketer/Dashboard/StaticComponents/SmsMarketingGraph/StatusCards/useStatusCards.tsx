import { DeliveredSmsIcon, FailedSmsIcon, SentSmsIcon } from '@/assets/icons';
import { Theme, useTheme } from '@mui/material';

const useStatusCards = (data: any) => {
  const theme = useTheme<Theme>();
  const smsStatusArray = [
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
      icon: <FailedSmsIcon />,
      count: data?.failed ?? 0,
      title: 'Failed',
    },
  ];

  return {
    theme,
    smsStatusArray,
  };
};

export default useStatusCards;
