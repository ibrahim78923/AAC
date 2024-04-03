import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  attachmentsDefaultValues,
  attachmentsValidationSchema,
} from './AttachmentsEditorDrawer.data';
import {
  useCreateAssociationMutation,
  usePostAttachmentsMutation,
} from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useAttachmentsEditorDrawer = ({ setOpenDrawer, dealId }: any) => {
  // attachmentRecord, openDrawer, commented for future
  const [postAttachments, { isLoading: loadingPostAttachment }] =
    usePostAttachmentsMutation();
  const [createAssociation] = useCreateAssociationMutation();

  const methodsAttachments = useForm({
    resolver: yupResolver(attachmentsValidationSchema),
    defaultValues: attachmentsDefaultValues,
  });

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('fileUrl', values?.attachment);
    formData.append('recordType', 'deals');
    formData.append('recordId', dealId);
    try {
      const response = await postAttachments({ body: formData }).unwrap();
      if (response?.data) {
        try {
          await createAssociation({
            body: {
              dealId: dealId,
              attachmentId: response?.data?._id,
            },
          }).unwrap();
          enqueueSnackbar(`Contact Added Successfully`, {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
          setOpenDrawer(false);
        } catch (error: any) {
          const errMsg = error?.data?.message;
          const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
          enqueueSnackbar(errMessage ?? 'Error occurred', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
        }
      }
    } catch (error) {}
  };
  const { handleSubmit } = methodsAttachments;
  return {
    handleSubmit,
    onSubmit,
    methodsAttachments,
    loadingPostAttachment,
  };
};

export default useAttachmentsEditorDrawer;
