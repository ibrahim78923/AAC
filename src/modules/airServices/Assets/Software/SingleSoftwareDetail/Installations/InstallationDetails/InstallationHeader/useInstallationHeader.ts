import { useState } from 'react';
import { useRemoveInstallationMutation } from '@/services/airServices/assets/software/single-software-detail/installations';
import { useSearchParams } from 'next/navigation';
import { InstallationHeaderI } from './InstallationHeader.interface';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useInstallationHeader = (props: InstallationHeaderI) => {
  const { activeCheck, setActiveCheck, setPage, setSearchBy } = props;
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [removeDeviceTrigger, { isLoading }] = useRemoveInstallationMutation();
  const searchParams = useSearchParams();
  const softwareId = searchParams?.get('softwareId');
  const submitDeleteModel = async () => {
    try {
      const deleteRes: any = await removeDeviceTrigger({
        body: {
          softwareId: activeCheck?.map((item) => item?._id),
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
  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearchBy(data);
  };
  return {
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    isLoading,
    handleOpenDelete,
    handleSearch,
  };
};
