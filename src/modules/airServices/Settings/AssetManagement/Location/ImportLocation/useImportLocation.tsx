import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  importLocationValidationSchema,
  importLocationDefaultValue,
} from './ImportLocation.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useImportLocation = (props: any) => {
  const { setIsDrawerOpen } = props;

  const router = useRouter();
  const theme: any = useTheme();

  const methods: any = useForm<any>({
    resolver: yupResolver(importLocationValidationSchema),
    defaultValues: importLocationDefaultValue,
  });

  const { handleSubmit, reset } = methods;
  const submitImportLocation = async () => {
    try {
      successSnackbar('Import Successfully');
      reset(importLocationDefaultValue);
      setIsDrawerOpen?.(false);
    } catch (error) {
      errorSnackbar(error);
    }
  };

  const onClose = () => {
    reset(importLocationDefaultValue);
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
