import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useDeleteCannedResponseMutation } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { enqueueSnackbar } from 'notistack';
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
      const response: any = await deleteCannedResponseTrigger(
        deleteCannedResponseParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Folder deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      closeCannedResponseDeleteModal?.();
    } catch (error: any) {
      enqueueSnackbar(
        error?.data?.message?.error ?? 'Business Hour not deleted',
        {
          variant: NOTISTACK_VARIANTS?.ERROR,
        },
      );
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
