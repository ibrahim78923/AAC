import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useImportVendor = (props: any) => {
  const { setIsDrawerOpen } = props;

  const methodsAttachments = useForm({});
  const { handleSubmit } = methodsAttachments;
  const onSubmit = async () => {
    enqueueSnackbar('Import Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setIsDrawerOpen(false);
  };
  const onClose = () => {
    setIsDrawerOpen?.(false);
  };
  return {
    methodsAttachments,

    handleSubmit,
    onSubmit,
    onClose,
  };
};
