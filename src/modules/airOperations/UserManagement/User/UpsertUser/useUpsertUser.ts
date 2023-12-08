import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertUserDefaultValues,
  upsertUserValidationSchema,
} from './UpsertUser.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useUpsertUser = (setIsDrawerOpen: any) => {
  const methods: any = useForm({
    resolver: yupResolver(upsertUserValidationSchema),
    defaultValues: upsertUserDefaultValues,
  });
  const { handleSubmit } = methods;

  const submit = async () => {
    enqueueSnackbar('Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setIsDrawerOpen(false);
  };
  return {
    methods,
    handleSubmit,
    submit,
  };
};
