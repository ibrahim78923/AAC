import { useForm } from 'react-hook-form';
import {
  createScheduleDefaultValues,
  createScheduleSchema,
} from './UpsertWorkloadSchedule.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useRouter } from 'next/router';

export const useUpsertWorkloadSchedule = () => {
  const router = useRouter();
  const { workloadScheduleId } = router?.query;
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

  return { handleSubmit, method, submitForm, router, workloadScheduleId };
};
