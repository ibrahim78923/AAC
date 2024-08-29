import {
  useDeleteChildLocationMutation,
  useDeleteParentLocationMutation,
} from '@/services/airServices/settings/asset-management/location';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ILocationProps } from '../Location.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useDeleteLocation = (props: ILocationProps) => {
  const { setDeleteModalOpen, selectedLocation, setSelectedLocation } = props;
  const [deleteParentLocationTrigger, deleteParentLocationStatus] =
    useDeleteParentLocationMutation();

  const [deleteChildLocationTrigger, deleteChildLocationStatus] =
    useDeleteChildLocationMutation();

  const handleParentDeleteLocation = async () => {
    if (!!selectedLocation?.isChild) {
      handleChildDeleteLocation?.();
      return;
    }
    const apiDataParameter = {
      queryParams: {
        id: selectedLocation?.parentId,
      },
    };
    try {
      await deleteParentLocationTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Location delete successfully');
      closeDeleteModal?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
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
      await deleteChildLocationTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Child location delete successfully');
      closeDeleteModal?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
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
