import {
  useLazyGetSingleAttachmentQuery,
  useDeleteSingleAttachmentMutation,
} from '@/services/airServices/tickets/attachments';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect, useState } from 'react';

export const useAttachments = (props: any) => {
  const { recordId, hasAttachments } = props;
  const [deleteModal, setDeleteModal] = useState({ open: false, id: '' });

  const [deleteAttachmentTrigger, deleteAttachmentStatus] =
    useDeleteSingleAttachmentMutation();

  const [
    getSingleAttachmentTrigger,
    { data, isFetching, isLoading, isError },
  ]: any = useLazyGetSingleAttachmentQuery();

  const getSingleAttachment = async () => {
    const getSingleAttachmentParameter = {
      pathParams: {
        id: recordId,
      },
    };

    try {
      const response: any = await getSingleAttachmentTrigger(
        getSingleAttachmentParameter,
      )?.unwrap();
      hasAttachments?.(!!response?.data?.length);
    } catch (error: any) {}
  };

  useEffect(() => {
    getSingleAttachment();
  }, []);

  const deleteAttachmentSubmit = async () => {
    const deleteSingleAttachmentParameter = {
      queryParams: {
        id: deleteModal?.id,
      },
    };

    try {
      await deleteAttachmentTrigger(deleteSingleAttachmentParameter)?.unwrap();
      successSnackbar('Attachment Deleted Successfully!');
      getSingleAttachment?.();
      setDeleteModal({ open: false, id: '' });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDeleteModal({ open: false, id: '' });
    }
  };

  return {
    deleteModal,
    setDeleteModal,
    deleteAttachmentSubmit,
    deleteAttachmentStatus,
    data,
    isFetching,
    isLoading,
    isError,
  };
};
