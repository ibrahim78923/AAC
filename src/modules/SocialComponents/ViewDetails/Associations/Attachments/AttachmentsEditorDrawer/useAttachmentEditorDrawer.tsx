import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  attachmentsDefaultValues,
  attachmentsValidationSchema,
} from './AttachmentsEditorDrawer.data';
import { isNullOrEmpty } from '@/utils';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import {
  usePostAssociationCompaniesMutation,
  usePostCompaniesAttachmentsMutation,
} from '@/services/commonFeatures/companies';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useAttachmentsEditorDrawer = (
  setOpenDrawer: any,
  companyId: any,
  RowData: any,
) => {
  const [postAttachment] = usePostCompaniesAttachmentsMutation();
  const [PostAssociationCompanies] = usePostAssociationCompaniesMutation();

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
      const res = await postAttachment({ body: formData })?.unwrap();

      const payload = {
        recordId: companyId?.companyId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
        attachmentsIds: [res?.data?._id],
      };
      if (res) {
        await PostAssociationCompanies({ body: payload }).unwrap();
        successSnackbar(`Attachment Added Successfully`);
      }
      setOpenDrawer('');
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  return { handleSubmit, onSubmit, methodsAttachments, setOpenDrawer };
};

export default useAttachmentsEditorDrawer;
