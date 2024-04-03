import { useDeleteCannedResponseMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';

export const useDeleteFolderModal = (props: any) => {
  const { id, handleActionClose } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const closeCannedResponseDeleteModal = () => {
    setOpenDeleteModal?.(false);
    handleActionClose();
  };
  const [deleteCannedResponseTrigger, { isLoading }] =
    useDeleteCannedResponseMutation();
  const deleteCannedResponse = async () => {
    const deleteParams = new URLSearchParams();
    deleteParams?.append('id', id);
    const deleteCannedResponseParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteCannedResponseTrigger(
        deleteCannedResponseParameter,
      )?.unwrap();
      successSnackbar('Folder deleted successfully');
      closeCannedResponseDeleteModal?.();
    } catch (error: any) {
      errorSnackbar();
      closeCannedResponseDeleteModal?.();
    }
  };
  return {
    setOpenDeleteModal,
    openDeleteModal,
    closeCannedResponseDeleteModal,
    deleteCannedResponse,
    isLoading,
    handleActionClose,
  };
};
