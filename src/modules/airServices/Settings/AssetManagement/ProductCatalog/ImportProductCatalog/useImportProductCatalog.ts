import { NOTISTACK_VARIANTS } from '@/constants/strings';
import usePath from '@/hooks/usePath';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export const useImportProductCatalog = (props: any) => {
  const { setIsDrawerOpen } = props;
  const importFormMethod = useForm({});
  const router = useRouter();
  const { makePath } = usePath();

  const { handleSubmit, reset } = importFormMethod;

  const submitImportFile = () => {
    enqueueSnackbar('File Uploaded Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
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
