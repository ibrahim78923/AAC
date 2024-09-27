import { useGetLocationQuery } from '@/services/airServices/settings/asset-management/location';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const useListLocation = () => {
  const router = useRouter();

  const { data, isLoading, isFetching, isError, refetch } = useGetLocationQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [collapseItem, setIsCollapse] = useState<undefined | number>();
  const handleCollapse = (item: number) => {
    setIsCollapse(collapseItem !== item ? item : undefined);
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const setDeleteRecord = (id: string) => {
    setSelectedLocation?.(id);
    setDeleteModalOpen?.(true);
  };

  const locationList = data?.data;

  return {
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
    router,
    isError,
    refetch,
  };
};
