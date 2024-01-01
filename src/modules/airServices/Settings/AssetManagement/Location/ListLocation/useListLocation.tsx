import { useTheme } from '@mui/material';
import { useGetLocationQuery } from '@/services/airServices/settings/asset-management/location';
import { useState } from 'react';

export const useListLocation = () => {
  const theme: any = useTheme();
  const { data, isLoading } = useGetLocationQuery(null);
  const [collapseItem, setIsCollapse] = useState<undefined | number>();
  const handleCollapse = (item: number) => {
    setIsCollapse(collapseItem !== item ? item : undefined);
  };
  const locationList = data?.data;

  return {
    theme,
    handleCollapse,
    locationList,
    isLoading,
    collapseItem,
  };
};
