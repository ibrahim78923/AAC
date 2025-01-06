import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './data';
import { yupResolver } from '@hookform/resolvers/yup';

export default function useModalPhoneNumber() {
  const [activeStep, setActiveStep] = React.useState(0);
  const methods: any = useForm({
    resolver: yupResolver(validationSchema(activeStep)),
    defaultValues: defaultValues,
    mode: 'onChange',
  });
  const { handleSubmit, trigger, reset } = methods;
  useEffect(() => {
    reset(defaultValues, { keepValues: true });
  }, [activeStep, reset]);

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = () => {
    // console.log('Form submitted successfully', data);
    // Add submission logic here
  };

  return {
    activeStep,
    handleNext,
    handleBack,
    methods,
    handleSubmit,
    onSubmit,
    reset,
  };
}
