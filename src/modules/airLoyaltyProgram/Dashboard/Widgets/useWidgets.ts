import { useTheme } from '@mui/material';
import { useState } from 'react';
import { getWidgetsDataArray } from './Widgets.data';
import { useGetLoyaltyDashboardWidgetsQuery } from '@/services/airLoyaltyProgram/dashboard';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';
import { useApiPolling } from '@/hooks/useApiPolling';

export const useWidgets = () => {
  const theme = useTheme();
  const [isHoveredId, setIsHoveredId] = useState(null);

  const { isError, isFetching, isLoading, data, refetch, fulfilledTimeStamp } =
    useGetLoyaltyDashboardWidgetsQuery(null, {
      refetchOnMountOrArgChange: true,
    });
  const ApiPollingHookProps = {
    isFetching,
    fulfilledTimeStamp,
    intervalTime: AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD,
  };
  const { timeLapse } = useApiPolling(ApiPollingHookProps);
  const widgetsData = getWidgetsDataArray(data?.data);
  return {
    isHoveredId,
    setIsHoveredId,
    theme,
    widgetsData,
    isFetching,
    isLoading,
    isError,
    timeLapse,
    refetch,
  };
};
