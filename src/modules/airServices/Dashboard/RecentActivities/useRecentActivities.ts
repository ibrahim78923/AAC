import { useGetRecentActivitiesQuery } from '@/services/airServices/dashboard';
import { useState } from 'react';

export const useRecentActivities = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { data, isLoading, isError, isFetching } = useGetRecentActivitiesQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    data,
    isLoading,
    isError,
    isFetching,
  };
};
