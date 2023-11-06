import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  updateContractFormValidationSchema,
  updateContractFormDefaultValues,
} from './UpdateContract.data';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { useTheme } from '@mui/material';

export const useUpdateContract = () => {
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(updateContractFormValidationSchema),
    defaultValues: updateContractFormDefaultValues,
  });
  const { handleSubmit } = methods;
  const router = useRouter();

  const handleCancelBtn = () => {
    router.push({ pathname: AIR_SERVICES?.ASSETS_CONTRACTS });
  };

  const submitUpdateContractForm = async () => {
    enqueueSnackbar('Contract Extended successfully', {
      variant: 'success',
      autoHideDuration: 3000,
    });
  };

  return {
    methods,
    handleSubmit,
    submitUpdateContractForm,
    router,
    theme,
    handleCancelBtn,
  };
};
