import { useForm } from 'react-hook-form';
import { CreateRulesValidationSchema, defaultValues } from './CreateRules.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';

export const useCreateRules = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(CreateRulesValidationSchema),
    defaultValues: defaultValues,
  });
  const { watch, register, handleSubmit, setValue } = methods;
  const onSubmit = async () => {
    enqueueSnackbar('Submit Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  const moveBack = () => {
    router?.push(AIR_OPERATIONS?.SERVICES_WORKFLOW);
  };
  return {
    methods,
    onSubmit,
    handleSubmit,
    moveBack,
    register,
    watch,
    setValue,
  };
};
