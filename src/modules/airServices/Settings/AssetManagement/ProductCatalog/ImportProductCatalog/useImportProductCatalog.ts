import usePath from '@/hooks/usePath';
import { successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export const useImportProductCatalog = (props: any) => {
  const { setIsDrawerOpen } = props;
  const importFormMethod = useForm({});
  const router = useRouter();
  const { makePath } = usePath();

  const { handleSubmit, reset } = importFormMethod;

  const submitImportFile = () => {
    successSnackbar('File Uploaded Successfully');
    onClose?.();
  };

  const onClose = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['productListAction'],
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
