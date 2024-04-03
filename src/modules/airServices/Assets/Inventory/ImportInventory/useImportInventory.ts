import usePath from '@/hooks/usePath';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export const useImportInventory = (props: any) => {
  const { setIsDrawerOpen } = props;
  const importFormMethod = useForm({});
  const router = useRouter();
  const { makePath } = usePath();

  const { handleSubmit, reset } = importFormMethod;

  const submitImportFile = () => {
    try {
      successSnackbar('File Uploaded Successfully');
      onClose?.();
    } catch (error) {
      errorSnackbar(error);
    }
  };

  const onClose = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['inventoryListsAction'],
      }),
    );
    reset?.();
    setIsDrawerOpen?.(false);
  };
  return {
    handleSubmit,
    onClose,
    submitImportFile,
    importFormMethod,
  };
};
