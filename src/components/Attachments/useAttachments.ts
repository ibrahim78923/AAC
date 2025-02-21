import { useLazyGetSingleAttachmentQuery } from '@/services/airServices/tickets/attachments';
import { useEffect, useState } from 'react';
import { AttachmentsPropsI } from './Attachments.interface';

export const useAttachments = (props: AttachmentsPropsI) => {
  const { recordId, hasAttachments } = props;
  const [deleteModal, setDeleteModal] = useState({ open: false, id: '' });

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

  return {
    deleteModal,
    setDeleteModal,
    data,
    isFetching,
    isLoading,
    isError,
    getSingleAttachment,
  };
};
