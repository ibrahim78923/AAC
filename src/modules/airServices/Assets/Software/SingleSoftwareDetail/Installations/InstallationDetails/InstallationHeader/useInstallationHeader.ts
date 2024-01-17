import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useRemoveInstallationMutation } from '@/services/airServices/assets/software/single-software-detail/installations';
import { useSearchParams } from 'next/navigation';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useInstallationHeader = (props: any) => {
  const { activeCheck, setActiveCheck } = props;
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [removeDeviceTrigger, { isLoading }] = useRemoveInstallationMutation();
  const searchParams = useSearchParams();
  const softwareId = searchParams?.get('softwareId');
  const submitDeleteModel = async () => {
    try {
      const deleteRes: any = await removeDeviceTrigger({
        id: activeCheck?.[0]?._id,
        body: { softwareId: softwareId },
      });
      enqueueSnackbar(
        deleteRes?.data?.message && 'Device Removed Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      setDeleteModal(false);
      setActiveCheck([]);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'An error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const handleOpenDelete = () => {
    if (activeCheck?.length > 1) {
      enqueueSnackbar('Cannot Remove Multiple Devices', {
        variant: NOTISTACK_VARIANTS?.WARNING,
      });
    } else {
      setDeleteModal(true);
    }
  };
  return {
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    isLoading,
    handleOpenDelete,
  };
};
