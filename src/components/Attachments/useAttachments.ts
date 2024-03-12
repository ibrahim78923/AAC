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

  const [getSingleAttachmentTrigger, { data, isFetching, isLoading, isError }] =
    useLazyGetSingleAttachmentQuery();

  const getSingleAttachment = async () => {
    const getSingleAttachmentParameter = {
      pathParams: {
        id: recordId,
      },
    };

    try {
      const response = await getSingleAttachmentTrigger(
        getSingleAttachmentParameter,
      )?.unwrap();
      hasAttachments?.(!!response?.data?.length);
    } catch (error: any) {}
  };

  useEffect(() => {
    getSingleAttachment();
  }, [data?.data?.length]);

  const deleteAttachmentSubmit = async () => {
    const deleteSingleAttachmentParameter = {
      queryParams: {
        id: deleteModal?.id,
      },
    };

    try {
      await deleteAttachmentTrigger(deleteSingleAttachmentParameter)?.unwrap();
      successSnackbar('Attachment Deleted Successfully!');
      setDeleteModal({ open: false, id: '' });
    } catch (err: any) {
      errorSnackbar();
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
