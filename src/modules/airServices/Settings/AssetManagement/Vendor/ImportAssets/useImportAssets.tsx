import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  attachmentsDefaultValues,
  attachmentsValidationSchema,
} from './ImportAssets.data';

export const useImportAssets = (props: any) => {
  const { setIsDrawerOpen } = props;

  const methodsAttachments = useForm({
    resolver: yupResolver(attachmentsValidationSchema),
    defaultValues: attachmentsDefaultValues,
  });
  const { handleSubmit } = methodsAttachments;
  const onSubmit = async () => {
    enqueueSnackbar('Import Successfully', {
      variant: 'success',
    });
    setIsDrawerOpen(false);
  };
  const onClose = () => {
    setIsDrawerOpen?.(false);
  };
  return {
    methodsAttachments,
    attachmentsValidationSchema,
    attachmentsDefaultValues,
    handleSubmit,
    onSubmit,
    onClose,
  };
};
