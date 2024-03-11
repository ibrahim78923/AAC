import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  attachmentsDefaultValues,
  attachmentsValidationSchema,
} from './AttachmentsEditorDrawer.data';
import { usePostAttachmentMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/attachments';
import { enqueueSnackbar } from 'notistack';

const useAttachmentsEditorDrawer = (setOpenDrawer: any, companyId: any) => {
  const [postAttachment] = usePostAttachmentMutation();

  const methodsAttachments = useForm({
    resolver: yupResolver(attachmentsValidationSchema),
    defaultValues: attachmentsDefaultValues,
  });

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData?.append('fileUrl', values?.attachment);
    formData?.append('recordId', companyId?.companyId);
    formData?.append('module ', 'Company');

    try {
      await postAttachment({ body: formData })?.unwrap();
      enqueueSnackbar('Attachment Added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }

    setOpenDrawer('');
  };
  const { handleSubmit } = methodsAttachments;
  return { handleSubmit, onSubmit, methodsAttachments, setOpenDrawer };
};

export default useAttachmentsEditorDrawer;
