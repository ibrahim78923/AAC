import { AIR_SERVICES } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteSoftwareMutation } from '@/services/airServices/assets/software';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
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
  const [deleteSoftwareTrigger, { isLoading }] = useDeleteSoftwareMutation();
  const deleteSoftware = async () => {
    try {
      const response: any = await deleteSoftwareTrigger(softwareId)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Software deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setDeleteModalOpen(false);
      router?.push(AIR_SERVICES?.ASSETS_SOFTWARE);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.error ?? 'Software not deleted', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

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
    isLoading,
    deleteSoftware,
    moveBackArrow,
  };
}
