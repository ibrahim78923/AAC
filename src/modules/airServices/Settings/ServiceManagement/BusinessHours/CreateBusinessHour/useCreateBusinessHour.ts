import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { businessHourDefaultValues } from './CreateBusinessHour.data';

export const useCreateBusinessHour = () => {
  const router = useRouter();
  const businessHourMethod = useForm({
    defaultValues: businessHourDefaultValues,
  });
  const { control, watch, setValue }: any = businessHourMethod;
  return {
    router,
    businessHourMethod,
    control,
    watch,
    setValue,
  };
};
