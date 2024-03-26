import {
  useDeleteChildLocationMutation,
  useDeleteParentLocationMutation,
} from '@/services/airServices/settings/asset-management/location';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteLocation = (props: any) => {
  const { setDeleteModalOpen, selectedLocation, setSelectedLocation } = props;
  const [deleteParentLocationTrigger, deleteParentLocationStatus] =
    useDeleteParentLocationMutation();

  const [deleteChildLocationTrigger, deleteChildLocationStatus] =
    useDeleteChildLocationMutation();

  const handleParentDeleteLocation = async () => {
    if (!!selectedLocation?.childId) {
      handleChildDeleteLocation?.();
      return;
    }
    const apiDataParameter = {
      queryParams: {
        id: selectedLocation,
      },
    };
    try {
      await deleteParentLocationTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Delete successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleChildDeleteLocation = async () => {
    const apiDataParameter = {
      body: {
        childId: selectedLocation?.childId,
        parentId: selectedLocation?.parentId,
      },
    };
    try {
      await deleteChildLocationTrigger({
        apiDataParameter,
      })?.unwrap();

      successSnackbar('Delete successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen?.(false);
    setSelectedLocation?.('');
  };

  return {
    handleParentDeleteLocation,
    closeDeleteModal,
    deleteParentLocationStatus,
    deleteChildLocationStatus,
  };
};
