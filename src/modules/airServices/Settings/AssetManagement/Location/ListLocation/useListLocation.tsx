import { useGetLocationQuery } from '@/services/airServices/settings/asset-management/location';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ACCORDION_ACTIONS } from '@/constants/mui-constant';
import { AIR_SERVICES } from '@/constants/routes';

export const useListLocation = () => {
  const router = useRouter();

  const { data, isLoading, isFetching, isError, refetch } = useGetLocationQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>({});

  const locationList = data?.data;

  const handleIconAction = (e: any, action: any, data: any) => {
    e?.stopPropagation();
    if (action === ACCORDION_ACTIONS?.EDIT) {
      router?.push({
        pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
        query: {
          type: data?.type,
          parentId: data?.parentId,
          ...(data?.childId
            ? {
                childId: data?.childId,
              }
            : {}),
        },
      });
      return;
    }
    if (action === ACCORDION_ACTIONS?.DELETE) {
      setDeleteModalOpen(true);
      setSelectedLocation({
        childId: data?.childId,
        parentId: data?.parentId,
        isChild: !!data?.childId,
      });
    }
  };

  return {
    locationList,
    isLoading,
    isFetching,
    deleteModalOpen,
    setDeleteModalOpen,
    selectedLocation,
    setSelectedLocation,
    router,
    isError,
    refetch,
    handleIconAction,
  };
};
