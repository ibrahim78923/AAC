import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './AddBusinessHours.data';
import { successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { AIR_CALL_CENTER } from '@/constants';

const useAddBusinessHours = () => {
  const methodsAddBusinessHours = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const navigate = useRouter();
  const router = useRouter();
  const { formValues } = router.query;
  const onSubmit = () => {
    successSnackbar('Business Hours Added Successfully');
    router.push(AIR_CALL_CENTER?.SETTINGS_BUSINESS_HOURS);
  };
  const { handleSubmit } = methodsAddBusinessHours;

  return {
    methodsAddBusinessHours,
    onSubmit,
    handleSubmit,
    navigate,
    formValues,
  };
};

export default useAddBusinessHours;
