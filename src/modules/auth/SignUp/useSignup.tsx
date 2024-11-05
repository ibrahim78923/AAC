import { useEffect, useState } from 'react';
import { defaultValues, validationSchema } from './SignUp.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  useAuthCompanyVerificationMutation,
  useGetAuthCompaniesQuery,
  useGetDrnCheckQuery,
  useGetEmailCheckQuery,
  useSignUpMutation,
} from '@/services/auth';
import { debouncedSearch } from '@/utils';
import { useGetProductsBilingInvoicesQuery } from '@/services/superAdmin/billing-invoices';
import { useRouter } from 'next/router';
import { AUTH } from '@/constants';
import { debounce } from 'lodash';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useSignup = () => {
  const { push } = useRouter();

  const [isStepComplete, setIsStepComplete] = useState<boolean>(false);
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
    const valuesNotEmpty = watchField?.every((value) => value?.trim() !== '');

    if (!valuesNotEmpty) {
      errorSnackbar('All Fields are Required');
    }
    return valuesNotEmpty;
  };

  const organizationNumber = watch('crn');
  const email = watch('email');
  const DRN = watch('DRN');

  const [emailExists, setEmailExists] = useState(email);
  const [drnExists, setDrnExists] = useState(DRN);

  const [orgNumber, setOrgNumber] = useState('');

  debouncedSearch(organizationNumber, setOrgNumber);

  const { data, isSuccess, isError } = useGetAuthCompaniesQuery(
    { q: orgNumber },
    { skip: orgNumber?.length < 3 },
  );

  const { data: emailData, isError: isEmailError } = useGetEmailCheckQuery(
    { email: emailExists },
    { skip: !emailExists },
  );
  const { data: drnData, isSuccess: drnIsSuccess } = useGetDrnCheckQuery(
    { drn: drnExists },
    { skip: !drnExists },
  );

  const validateEmailFormat = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const [debouncedEmail, setDebouncedEmail] = useState(email);
  const [debouncedDrn, setDebouncedDrn] = useState(DRN);

  const debounceEmail = debounce((value: any) => {
    setDebouncedEmail(value);
  }, 2000);

  const debounceDrn = debounce((value: any) => {
    setDebouncedDrn(value);
  }, 2000);

  useEffect(() => {
    debounceEmail(email);
    return () => {
      debounceEmail?.cancel();
    };
  }, [email]);

  useEffect(() => {
    if (validateEmailFormat(debouncedEmail)) {
      setEmailExists(debouncedEmail);
    } else {
      setEmailExists('');
    }
  }, [debouncedEmail]);

  useEffect(() => {
    setDrnExists(debouncedDrn);
  }, [debouncedDrn]);

  useEffect(() => {
    debounceDrn(DRN);
    return () => {
      debounceDrn?.cancel();
    };
  }, [DRN]);

  const [signUpValue, { isLoading }] = useSignUpMutation();
  const [authCompanyVerification, { isSuccess: isVerifiedSuccess }] =
    useAuthCompanyVerificationMutation();

  const { data: productData } = useGetProductsBilingInvoicesQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const onSubmit = async (value: any) => {
    const { firstName, lastName } = value;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { organizationName, confirmPassword, DRN, ...rest } = value;

    const user = {
      ...rest,
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      role: 'ORG_ADMIN',
      drn: value?.DRN,
    };

    try {
      const response: any = await signUpValue({ user }).unwrap();
      if (response?.data) {
        // bypassing the ig varification in future routing should be done on successful varification
        push(AUTH.LOGIN);

        try {
          await authCompanyVerification({ email: { email: email } }).unwrap();
          successSnackbar('Check the Email for verification');
        } catch (error: any) {
          const errMsg = error?.data?.message;
          errorSnackbar(errMsg ?? 'Error occurred');
        }
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      errorSnackbar(errMsg ?? 'Error occurred');
    }
  };

  let companyDetails: any = {};
  if (isSuccess) {
    companyDetails = data?.data;
  }

  useEffect(() => {
    if (!methodsSignup?.formState?.isValid) {
      const errors = methodsSignup?.formState?.errors;
      const errorFieldsToCheck = [
        'lastName',
        'firstName',
        'email',
        'crn',
        'organizationName',
        'numberOfEmployees',
        'phoneNumber',
      ];
      const hasErrorInRequiredFields = Object.keys(errors).some((fieldName) =>
        errorFieldsToCheck.includes(fieldName),
      );

      if (hasErrorInRequiredFields) {
        setIsStepComplete(false);
      }
    }
  });

  useEffect(() => {
    if (isEmailError) {
      errorSnackbar('Email already exists');
    }
  }, [emailData, isEmailError]);

  useEffect(() => {
    if (isError) {
      errorSnackbar('Please enter correct Organization Number');
    }
  }, [data, isError]);

  useEffect(() => {
    if (drnIsSuccess) {
      errorSnackbar('DRN already exists');
    }
  }, [drnData, drnIsSuccess]);

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
    isStepComplete,
    setIsStepComplete,
    isError,
    isEmailError,
    email,
    drnIsSuccess,
  };
};

export default useSignup;
