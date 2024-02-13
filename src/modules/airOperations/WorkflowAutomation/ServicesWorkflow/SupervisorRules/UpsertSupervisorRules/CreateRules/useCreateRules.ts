import { useForm } from 'react-hook-form';
import { CreateRulesValidationSchema, defaultValues } from './CreateRules.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import { useSearchParams } from 'next/navigation';

export const useCreateRules = () => {
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
  const searchParams = useSearchParams();
  const action = searchParams?.get('action');

  const { push } = useRouter();
  const handleMoveBack = () => push(AIR_OPERATIONS?.SERVICES_WORKFLOW);
  return {
    methods,
    onSubmit,
    handleSubmit,
    handleMoveBack,
    register,
    watch,
    setValue,
    action,
  };
};
