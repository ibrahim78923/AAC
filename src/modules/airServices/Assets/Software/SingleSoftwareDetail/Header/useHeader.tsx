import { AIR_SERVICES } from '@/constants';
import { useGetSoftwareByIdQuery } from '@/services/airServices/assets/software';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';

export function useHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const softwareId: any = searchParams.get('softwareId');

  const { data, isLoading, isFetching } = useGetSoftwareByIdQuery(
    { id: softwareId },
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

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    handleClick,
    handleClose,
    open,
    anchorEl,
    moveBackArrow,
    data,
    isLoading,
    isFetching,
  };
}
