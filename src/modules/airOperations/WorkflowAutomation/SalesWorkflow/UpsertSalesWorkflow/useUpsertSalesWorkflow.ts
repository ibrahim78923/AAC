import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { salesSchema, salesValues } from './UpsertSalesWorkflow.data';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useUpsertSalesWorkflow = () => {
  const salesMethod = useForm({
    defaultValues: salesValues,
    resolver: yupResolver(salesSchema),
  });
  const { reset, watch, register, handleSubmit, setValue, control } =
    salesMethod;
  const handleFormSubmit = () => {
    enqueueSnackbar('Workflow Enabled Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
  };
  const { palette } = useTheme();
  const moduleType = watch('moduleType');
  return {
    salesMethod,
    handleFormSubmit,
    register,
    handleSubmit,
    palette,
    moduleType,
    setValue,
    watch,
    control,
  };
};
