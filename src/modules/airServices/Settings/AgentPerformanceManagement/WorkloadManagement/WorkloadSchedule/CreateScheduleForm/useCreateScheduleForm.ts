import { useForm } from 'react-hook-form';
import {
  createScheduleDefaultValues,
  createScheduleSchema,
} from './CreateScheduleForm.dara';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

export const useCreateScheduleForm = () => {
  const method = useForm({
    defaultValues: createScheduleDefaultValues,
    resolver: yupResolver(createScheduleSchema),
  });
  const { reset, handleSubmit } = method;
  const submitForm = async () => {
    enqueueSnackbar('Created Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const formType = searchParams?.get('type');

  return { handleSubmit, method, submitForm, router, formType };
};
