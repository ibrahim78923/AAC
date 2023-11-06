import { useEffect } from 'react';
import { defaultValues, noOfEmployee, validationSchema } from './SignUp.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const useSignup = () => {
  const methodsSignup = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit, watch, setValue } = methodsSignup;
  const organizationNumber = watch('organizationNumber');

  useEffect(() => {
    const selectedOrg = noOfEmployee.find(
      (org) => org.value === organizationNumber?.value,
    );
    const organizationName = selectedOrg ? selectedOrg.value : '';

    setValue('organizationName', organizationName);
  }, [organizationNumber]);

  return { onSubmit, handleSubmit, methodsSignup };
};

export default useSignup;
