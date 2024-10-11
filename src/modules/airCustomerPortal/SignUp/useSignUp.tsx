import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  SignUpDefaultValues,
  SignUpValidationSchema,
  createPasswordFields,
} from './SignUp.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useAuthCustomerIgVerificationMutation,
  useAuthCustomerSignUpMutation,
} from '@/services/airCustomerPortal/auth';
import { GLOBAL_CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import { AUTH } from '@/constants';

export default function useSignUp() {
  const [stepState, setStepState] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const router: any = useRouter();

  const { companyId } = router?.query;

  const method = useForm({
    resolver: yupResolver(SignUpValidationSchema),
    defaultValues: SignUpDefaultValues,
  });
  const { handleSubmit, reset, getValues } = method;

  const togglePasswordVisibility = (field: any) => {
    setPasswordVisibility((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const createPasswordDataArray = createPasswordFields(
    togglePasswordVisibility,
    passwordVisibility,
  );

  const onNext = () => {
    const { firstName, lastName, email, phoneNumber } = getValues();

    const validationChecks = [
      {
        condition: firstName?.trim() === '',
        message: 'First Name is Required',
      },
      {
        condition: firstName?.length > GLOBAL_CHARACTERS_LIMIT?.NAME,
        message: `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
      },
      {
        condition: lastName?.trim() === '',
        message: 'Last Name is Required',
      },
      {
        condition: lastName?.length > GLOBAL_CHARACTERS_LIMIT?.NAME,
        message: `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
      },
      {
        condition: email?.trim() === '',
        message: 'Email is Required',
      },
      {
        condition: email?.length > GLOBAL_CHARACTERS_LIMIT?.EMAIL,
        message: `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.EMAIL}`,
      },
      {
        condition: !REGEX?.EMAIL?.test(email),
        message: 'Enter a valid Email',
      },
      {
        condition: phoneNumber?.trim() === '',
        message: 'Phone Number is Required',
      },
      {
        condition: !REGEX?.PHONE_NUMBER?.test(phoneNumber),
        message: 'Only UK phone number',
      },
    ];

    for (const { condition, message } of validationChecks) {
      if (condition) {
        errorSnackbar(message);
        return;
      }
    }

    setStepState(true);
  };

  const [postSignUpTrigger, postSignUpStatus] = useAuthCustomerSignUpMutation();

  const [igVerificationTrigger, igVerificationStatus] =
    useAuthCustomerIgVerificationMutation();

  const decryptedId = atob(companyId ?? '');

  const onSubmit = async (data: any) => {
    const userDetails = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      role: 'ORG_REQUESTER',
      companyId: decryptedId,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      password: data?.password,
    };

    try {
      await postSignUpTrigger(userDetails)?.unwrap();
      try {
        await igVerificationTrigger({ email: data?.email })?.unwrap();
      } catch (e) {}
      successSnackbar('Account Created Successfully!');
      reset();
      router?.push(AUTH?.LOGIN);
    } catch (error: any) {
      errorSnackbar();
    }
  };

  return {
    method,
    handleSubmit,
    onSubmit,
    stepState,
    onNext,
    createPasswordDataArray,
    setStepState,
    postSignUpStatus,
    companyId,
    igVerificationStatus,
  };
}
