import { useTheme } from '@mui/material';
import { useState } from 'react';
import { getWidgetsDataArray } from './Widgets.data';
import { useGetLoyaltyDashboardWidgetsQuery } from '@/services/airLoyaltyProgram/dashboard';

export const useWidgets = () => {
  const theme = useTheme();
  const [isHoveredId, setIsHoveredId] = useState(null);

  const { isError, isFetching, isLoading, data, refetch, fulfilledTimeStamp } =
    useGetLoyaltyDashboardWidgetsQuery(null, {
      refetchOnMountOrArgChange: true,
    });
  const widgetsData = getWidgetsDataArray(data?.data);
  return {
    isHoveredId,
    setIsHoveredId,
    theme,
    widgetsData,
    isFetching,
    isLoading,
    isError,
    refetch,
    fulfilledTimeStamp,
  };
};
