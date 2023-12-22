import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  businessHourDefaultValues,
  businessHourValidationSchema,
} from './CreateBusinessHour.data';
import { yupResolver } from '@hookform/resolvers/yup';

export const useCreateBusinessHour = () => {
  const router = useRouter();
  const businessHourMethod = useForm({
    defaultValues: businessHourDefaultValues,
    resolver: yupResolver(businessHourValidationSchema),
  });
  const { control, watch, setValue, handleSubmit }: any = businessHourMethod;
  const onSubmitRequest = handleSubmit(() => {});
  return {
    router,
    businessHourMethod,
    control,
    watch,
    setValue,
    onSubmitRequest,
  };
};
