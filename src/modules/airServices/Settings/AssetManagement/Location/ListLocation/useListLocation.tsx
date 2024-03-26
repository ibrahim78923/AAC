import { useTheme } from '@mui/material';
import { useGetLocationQuery } from '@/services/airServices/settings/asset-management/location';
import { useState } from 'react';

export const useListLocation = () => {
  const theme: any = useTheme();
  const { data, isLoading, isFetching } = useGetLocationQuery(null);
  const [collapseItem, setIsCollapse] = useState<undefined | number>();
  const handleCollapse = (item: number) => {
    setIsCollapse(collapseItem !== item ? item : undefined);
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const setDeleteRecord = (id: any) => {
    setSelectedLocation?.(id);
    setDeleteModalOpen?.(true);
  };
  const locationList = data?.data;
  return {
    theme,
    handleCollapse,
    locationList,
    isLoading,
    collapseItem,
    isFetching,
    deleteModalOpen,
    setDeleteModalOpen,
    selectedLocation,
    setSelectedLocation,
    setDeleteRecord,
  };
};
