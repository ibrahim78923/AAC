import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  SignUpDefaultValues,
  SignUpValidationSchema,
  createPasswordFields,
  getSignUpFormFields,
} from './SignUp.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useAuthCustomerSignUpMutation,
  useAuthIgVerificationMutation,
  useLazyGetComapnyDropdownQuery,
} from '@/services/airCustomerPortal/auth';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export default function useSignUp() {
  const [stepState, setStepState] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const router: any = useRouter();

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
    if (firstName?.trim() === '') {
      errorSnackbar('First Name is Required');
      return;
    }
    if (lastName?.trim() === '') {
      errorSnackbar('Last Name is Required');
      return;
    }
    if (email?.trim() === '') {
      errorSnackbar('Email is Required');
      return;
    }
    if (phoneNumber?.trim() === '') {
      errorSnackbar('Phone Number is Required');
      return;
    }
    setStepState(true);
  };

  const apiQueryCompany = useLazyGetComapnyDropdownQuery();

  const SignUpFormFields = getSignUpFormFields({ apiQueryCompany });

  const [postSignUpTrigger, postSignUpStatus] = useAuthCustomerSignUpMutation();
  const [postIgVerficationTrigger] = useAuthIgVerificationMutation();

  const onSubmit = async (data: any) => {
    const userDetails = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      role: 'ORG_REQUESTER',
      companyId: data?.companyName?._id,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      password: data?.password,
    };

    try {
      const res: any = await postSignUpTrigger(userDetails)?.unwrap();
      successSnackbar('Account Created Successfully!');
      reset();
      router?.push(
        `${AIR_CUSTOMER_PORTAL?.CUSTOMER_PORTAL_VERIFICATION}?email=${userDetails?.email}`,
      );
      if (res?.data) {
        try {
          await postIgVerficationTrigger({
            email: { email: userDetails?.email },
          }).unwrap();
        } catch (error: any) {}
      }
    } catch (error: any) {
      errorSnackbar();
    }
  };

  return {
    method,
    handleSubmit,
    onSubmit,
    stepState,
    SignUpFormFields,
    onNext,
    createPasswordDataArray,
    setStepState,
    postSignUpStatus,
  };
}
