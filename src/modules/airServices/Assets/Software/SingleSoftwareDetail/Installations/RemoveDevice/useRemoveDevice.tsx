import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRemoveInstallationMutation } from '@/services/airServices/assets/software/single-software-detail/installations';
import { useRouter } from 'next/router';
import { RemoveDevicesPropsI } from '../Installations.interface';
import { PAGINATION } from '@/config';

export const useRemoveDevice = (props: RemoveDevicesPropsI) => {
  const {
    setIsPortalOpen,
    selectedDeviceList,
    setPage,
    setSelectedDeviceList,
    page,
    getInstallationListData,
    totalRecords,
  } = props;

  const router = useRouter();
  const softwareId = router?.query?.softwareId;
  const [removeDeviceTrigger, { isLoading }] = useRemoveInstallationMutation();

  const refetchApi = async () => {
    const newPage =
      selectedDeviceList?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    setPage?.(newPage);
    await getInstallationListData?.(newPage);
  };

  const closeModal = () => {
    setIsPortalOpen?.({ isOpen: false, action: '' });
    setSelectedDeviceList?.([]);
  };

  const submitDeleteModal = async () => {
    const apiDataParameter = {
      body: {
        softwareId: selectedDeviceList?.map((item: any) => item?._id),
        id: softwareId,
      },
    };
    try {
      await removeDeviceTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Device removed successfully');
      closeModal();
      await refetchApi();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    isLoading,
    closeModal,
    submitDeleteModal,
  };
};
