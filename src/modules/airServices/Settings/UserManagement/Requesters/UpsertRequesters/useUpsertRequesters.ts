import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertRequestersDefaultValues,
  upsertRequestersValidationSchema,
} from './UpsertRequesters.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useUpsertRequesters = () => {
  const methods: any = useForm({
    resolver: yupResolver(upsertRequestersValidationSchema),
    defaultValues: upsertRequestersDefaultValues,
  });
  const { handleSubmit } = methods;

  const submit = () => {
    enqueueSnackbar('Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  return {
    methods,
    handleSubmit,
    submit,
  };
};
