import { useState } from 'react';
import { useRemoveInstallationMutation } from '@/services/airServices/assets/software/single-software-detail/installations';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useInstallationHeader = (props: any) => {
  const { activeCheck, setActiveCheck } = props;
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [removeDeviceTrigger, { isLoading }] = useRemoveInstallationMutation();
  const searchParams = useSearchParams();
  const softwareId = searchParams?.get('softwareId');
  const submitDeleteModel = async () => {
    try {
      const deleteRes: any = await removeDeviceTrigger({
        body: {
          softwareId: activeCheck?.map((item: any) => item?._id),
          id: softwareId,
        },
      });
      successSnackbar(
        deleteRes?.data?.message && 'Device Removed Successfully',
      );
      setDeleteModal(false);
      setActiveCheck([]);
    } catch (error: any) {
      errorSnackbar(error?.data?.message ?? 'An error occurred');
    }
  };
  const handleOpenDelete = () => {
    setDeleteModal(true);
  };
  return {
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    isLoading,
    handleOpenDelete,
  };
};
