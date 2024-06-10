import {
  DeliveredSmsIcon,
  FailedSmsIcon,
  ReadSmsIcon,
  RepliedSmsIcon,
  SentSmsIcon,
} from '@/assets/icons';
import { Theme, useTheme } from '@mui/material';

const useStatusCards = (dashboardCardsData: any) => {
  const theme = useTheme<Theme>();

  const smsStatusArray = [
    {
      icon: <SentSmsIcon />,
      count: dashboardCardsData?.sent,
      title: 'Sent',
      divider: true,
    },
    {
      icon: <DeliveredSmsIcon />,
      count: dashboardCardsData?.delivered,
      title: 'Delivered',
      divider: true,
    },
    {
      icon: <ReadSmsIcon />,
      count: dashboardCardsData?.read,
      title: 'Read',
      divider: true,
    },
    {
      icon: <RepliedSmsIcon />,
      count: dashboardCardsData?.replied,
      title: 'Replied',
      divider: true,
    },
    {
      icon: <FailedSmsIcon />,
      count: dashboardCardsData?.failed,
      title: 'Failed',
    },
  ];

  return {
    theme,
    smsStatusArray,
  };
};

export default useStatusCards;
