import { useForm } from 'react-hook-form';

import { successSnackbar } from '@/utils/api';

export const useImportVendor = (props: any) => {
  const { setIsDrawerOpen } = props;

  const methodsAttachments = useForm({});
  const { handleSubmit } = methodsAttachments;
  const onSubmit = async () => {
    successSnackbar('Import Successfully');
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
