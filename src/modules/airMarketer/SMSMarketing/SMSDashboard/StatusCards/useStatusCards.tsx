import {
  DeliveredSmsIcon,
  FailedSmsIcon,
  ReadSmsIcon,
  RepliedSmsIcon,
  SentSmsIcon,
} from '@/assets/icons';
import { Theme, useTheme } from '@mui/material';

const useStatusCards = (
  dashboardCardsData: any,
  analytics: any,
  isDashboard: any,
) => {
  const theme = useTheme<Theme>();

  const smsStatusArray = [
    {
      icon: <SentSmsIcon />,
      count: isDashboard ? dashboardCardsData?.sent : analytics?.sent,
      title: 'Sent',
      divider: true,
    },
    {
      icon: <DeliveredSmsIcon />,
      count: isDashboard ? dashboardCardsData?.delivered : analytics?.delivered,
      title: 'Delivered',
      divider: true,
    },
    {
      icon: <ReadSmsIcon />,
      count: isDashboard ? dashboardCardsData?.read : analytics?.read,
      title: 'Read',
      divider: true,
    },
    {
      icon: <RepliedSmsIcon />,
      count: isDashboard ? dashboardCardsData?.replied : analytics?.replied,
      title: 'Replied',
      divider: true,
    },
    {
      icon: <FailedSmsIcon />,
      count: isDashboard ? dashboardCardsData?.failed : analytics?.failed,
      title: 'Failed',
    },
  ];

  return {
    theme,
    smsStatusArray,
  };
};

export default useStatusCards;
