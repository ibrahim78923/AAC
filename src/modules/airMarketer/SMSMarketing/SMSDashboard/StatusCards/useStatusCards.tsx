import { DeliveredSmsIcon, FailedSmsIcon, SentSmsIcon } from '@/assets/icons';
import { Theme, useTheme } from '@mui/material';
import { DashboardCardsDataInterface } from '../SMSDashboard-interface';

const useStatusCards = (
  dashboardCardsData: DashboardCardsDataInterface,
  analytics: DashboardCardsDataInterface,
  isDashboard: boolean,
) => {
  const theme = useTheme<Theme>();
  const deliveredAndFailedSum = isDashboard
    ? (dashboardCardsData?.delivered || 0) + (dashboardCardsData?.failed || 0)
    : null;

  const smsStatusArray = [
    {
      icon: <SentSmsIcon />,
      count: isDashboard ? deliveredAndFailedSum : analytics?.sent,
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
