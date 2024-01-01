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
import { enqueueSnackbar } from 'notistack';

const useSignup = () => {
  const methodsSignup = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch, setValue } = methodsSignup;

  const watchField = watch([
    'firstName',
    'lastName',
    'email',
    'crn',
    'numberOfEmployees',
    'phoneNumber',
  ]);

  const allValuesNotEmpty = () => {
    const valuesNotEmpty = watchField.every((value) => value.trim() !== '');
    if (!valuesNotEmpty) {
      enqueueSnackbar('All Fields are Required', { variant: 'error' });
    }
    return valuesNotEmpty;
  };

  const organizationNumber = watch('crn');
  const email = watch('email');

  const [orgNumber, setOrgNumber] = useState('');

  debouncedSearch(organizationNumber, setOrgNumber);
  const { data, isSuccess, isError } = useGetAuthCompaniesQuery(
    { q: orgNumber },
    { skip: orgNumber?.length < 3 },
  );

  const [signUpValue, { isLoading }] = useSignUpMutation();
  const [authCompanyVerification, { isSuccess: isVerifiedSuccess }] =
    useAuthCompanyVerificationMutation();

  const { data: productData } = useGetProductsQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const onSubmit = async (value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { organizationName, confirmPassword, DRN, ...rest } = value;

    const user = {
      ...rest,
      role: 'ORG_ADMIN',
    };

    try {
      const response: any = await signUpValue({ user }).unwrap();
      if (response?.data) {
        try {
          await authCompanyVerification({ email: { email: email } }).unwrap();
        } catch (error: any) {
          const errMsg = error?.data?.message;
          enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
        }
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
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
    isLoading,
    allValuesNotEmpty,
    methodsSignup,
    productData,
    isVerifiedSuccess,
  };
};

export default useSignup;
