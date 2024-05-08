import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  attachmentsDefaultValues,
  attachmentsValidationSchema,
} from './AttachmentsEditorDrawer.data';
import { usePostAttachmentMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/attachments';
import { enqueueSnackbar } from 'notistack';
import { isNullOrEmpty } from '@/utils';

const useAttachmentsEditorDrawer = (
  setOpenDrawer: any,
  companyId: any,
  RowData: any,
) => {
  const [postAttachment] = usePostAttachmentMutation();

  const methodsAttachments = useForm({
    resolver: yupResolver(attachmentsValidationSchema),
    // defaultValues: attachmentsDefaultValues,
    defaultValues: async () => {
      if (!isNullOrEmpty(RowData?.fileUrl)) {
        const { fileUrl } = RowData;
        return {
          fileUrl,
        };
      }
      return attachmentsDefaultValues;
    },
  });
  const { handleSubmit, reset } = methodsAttachments;

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData?.append('fileUrl', values?.fileUrl);
    formData?.append('recordType', 'companies');
    formData?.append('module', 'COMPANIES');
    formData?.append('recordId', companyId?.companyId);

    try {
      await postAttachment({ body: formData })?.unwrap();
      enqueueSnackbar('Attachment Added successfully', {
        variant: 'success',
      });
      setOpenDrawer('');
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };
  return { handleSubmit, onSubmit, methodsAttachments, setOpenDrawer };
};

export default useAttachmentsEditorDrawer;
