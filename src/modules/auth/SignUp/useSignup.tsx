import { useEffect, useState } from 'react';
import { defaultValues, validationSchema } from './SignUp.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useGetAuthCompaniesQuery, useSignUpMutation } from '@/services/auth';
import { debouncedSearch } from '@/utils';

const useSignup = () => {
  const methodsSignup = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch, setValue } = methodsSignup;

  const organizationNumber = watch('crn');
  const [orgNumber, setOrgNumber] = useState('');

  debouncedSearch(organizationNumber, setOrgNumber);
  const { data, isSuccess, isError } = useGetAuthCompaniesQuery(
    { q: orgNumber },
    { skip: orgNumber.length < 3 },
  );

  const [signUpValue] = useSignUpMutation();

  const onSubmit = async (value: any) => {
    const user = {
      ...value,
      role: 'ORG_ADMIN',
    };

    await signUpValue({ user });
  };

  let companyDetails: any = {};
  if (isSuccess) {
    companyDetails = data?.data;
  }

  useEffect(() => {
    setValue('organizationName', companyDetails?.company_name);
    setOrgNumber(organizationNumber);
  }, [data, isError]);

  return { onSubmit, handleSubmit, methodsSignup };
};

export default useSignup;
