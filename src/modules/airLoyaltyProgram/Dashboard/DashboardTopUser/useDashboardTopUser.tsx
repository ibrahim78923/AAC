import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';
import { data, dashboardTopUserColumnsFunction } from './DashboardTopUser.data';

export const useDashboardTopUser = () => {
  const router = useRouter();
  const theme = useTheme();

  const dashboardTopUserColumns = dashboardTopUserColumnsFunction();

  return {
    theme,
    router,
    dashboardTopUserColumns,
    data,
  };
};
