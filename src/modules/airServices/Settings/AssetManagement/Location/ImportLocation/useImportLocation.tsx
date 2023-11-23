import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  importLocationValidationSchema,
  importLocationDefaultValue,
} from './ImportLocation.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useImportLocation = (props: any) => {
  const { setIsDrawerOpen } = props;

  const router = useRouter();
  const theme: any = useTheme();

  const methods: any = useForm<any>({
    resolver: yupResolver(importLocationValidationSchema),
    defaultValues: importLocationDefaultValue(),
  });

  const { handleSubmit, reset } = methods;
  const submitImportLocation = async () => {
    try {
      reset();
      setIsDrawerOpen?.(false);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const onClose = () => {
    reset();
    setIsDrawerOpen(false);
  };

  return {
    router,
    theme,
    handleSubmit,
    submitImportLocation,
    methods,
    onClose,
  };
};
