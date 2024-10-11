import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './AttachmentForm.data';
import { useRouter } from 'next/router';
import { MODULE_TYPE } from '@/constants/strings';
import { usePostAirServicesPurchaseOrderDetailsAttachmentsMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/attachments';

export const useAttachmentForm = (props: any) => {
  const { setAddAttachment } = props;
  const router = useRouter();
  const { purchaseOrderId } = router?.query;
  const [postAttachmentsTrigger, postAttachmentsStatus] =
    usePostAirServicesPurchaseOrderDetailsAttachmentsMutation();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = async (data: any) => {
    const attachmentFormData = new FormData();

    attachmentFormData?.append('fileUrl', data?.attachments);
    attachmentFormData?.append('recordId', purchaseOrderId as string);
    attachmentFormData?.append('module', MODULE_TYPE?.ASSETS);

    const postAttachmentParameter = {
      body: attachmentFormData,
    };

    try {
      await postAttachmentsTrigger(postAttachmentParameter)?.unwrap();
      successSnackbar('Attachment Added Successfully!');
      setAddAttachment?.(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    methods,
    onSubmit,
    postAttachmentsStatus,
  };
};
