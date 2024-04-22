import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  attachmentsDefaultValues,
  attachmentsValidationSchema,
} from './AttachmentsEditorDrawer.data';
import {
  useCreateAssociationMutation,
  useLazyGetAttachmentsByIdQuery,
  usePostAttachmentsMutation,
} from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useEffect } from 'react';

const useAttachmentsEditorDrawer = ({
  setOpenDrawer,
  dealId,
  attachmentRecord,
  openDrawer,
}: any) => {
  // attachmentRecord, openDrawer, commented for future

  const [postAttachments, { isLoading: loadingPostAttachment }] =
    usePostAttachmentsMutation();

  const [getAttachmentsById, { isLoading: loadingAttachment }] =
    useLazyGetAttachmentsByIdQuery();

  const [createAssociation] = useCreateAssociationMutation();

  const methodsAttachments = useForm({
    resolver: yupResolver(attachmentsValidationSchema),
    defaultValues: attachmentsDefaultValues,
  });

  useEffect(() => {
    if (openDrawer === 'View') {
      getAttachmentsById({ id: attachmentRecord?._id }).unwrap();
    }
  }, []);

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
          enqueueSnackbar(`Attachment Added Successfully`, {
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
    loadingAttachment,
  };
};

export default useAttachmentsEditorDrawer;
