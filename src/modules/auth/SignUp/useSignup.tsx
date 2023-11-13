import { useEffect, useState } from 'react';
import { defaultValues, validationSchema } from './SignUp.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  useAuthCompanyVerificationMutation,
  useGetAuthCompaniesQuery,
  useSignUpMutation,
} from '@/services/auth';
import { debouncedSearch } from '@/utils';
import { useGetProductsQuery } from '@/services/superAdmin/billing-invoices';

const useSignup = () => {
  const methodsSignup = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch, setValue } = methodsSignup;

  const organizationNumber = watch('crn');
  const email = watch('email');

  const [orgNumber, setOrgNumber] = useState('');

  debouncedSearch(organizationNumber, setOrgNumber);
  const { data, isSuccess, isError } = useGetAuthCompaniesQuery(
    { q: orgNumber },
    { skip: orgNumber?.length < 3 },
  );

  const [signUpValue] = useSignUpMutation();
  const [authCompanyVerification, { isSuccess: isVerifiedSuccess }] =
    useAuthCompanyVerificationMutation();

  const { data: productData } = useGetProductsQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const onSubmit = async (value: any) => {
    const user = {
      ...value,
      role: 'ORG_ADMIN',
    };

    const response: any = await signUpValue({ user });

    if (response?.data) {
      authCompanyVerification({ email: { email: email } });
    }
  };

  let companyDetails: any = {};
  if (isSuccess) {
    companyDetails = data?.data;
  }

  useEffect(() => {
    setValue('organizationName', companyDetails?.company_name);
    setOrgNumber(organizationNumber);
  }, [data, isError]);

  return {
    onSubmit,
    handleSubmit,
    methodsSignup,
    productData,
    isVerifiedSuccess,
  };
};

export default useSignup;
