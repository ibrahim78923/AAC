import { AIR_SERVICES } from '@/constants';
import { useGetSoftwareByIdQuery } from '@/services/airServices/assets/software';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { softwareActionsOptions } from './Header.data';

export function useHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const router = useRouter();

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const softwareId = searchParams.get('softwareId');

  const { data, isLoading, isFetching } = useGetSoftwareByIdQuery(
    { id: softwareId as string },
    {
      refetchOnMountOrArgChange: true,
      skip: !!!softwareId,
    },
  );

  const moveBackArrow = () => {
    router?.push({
      pathname: AIR_SERVICES?.ASSETS_SOFTWARE,
    });
  };

  const actionOptions = softwareActionsOptions(
    setIsDrawerOpen,
    setDeleteModalOpen,
  );

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    open,
    moveBackArrow,
    data,
    isLoading,
    isFetching,
    actionOptions,
  };
}
