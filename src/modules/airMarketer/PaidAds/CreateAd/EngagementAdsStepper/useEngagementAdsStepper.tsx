import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  adDefaultValues,
  adValidation,
  autoDefaultValues,
  autoValidation,
  budgetDefaultValues,
  budgetValidation,
  taregtValidation,
  targetDefaultValues,
} from './EngagementAdsStepper.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BudgetScheduleMockImage,
  MockEngagementTabsImage,
} from '@/assets/images';

const useTempStepper = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const initialStep = 0;
  const stepOne = 1;
  const stepTwo = 2;
  const stepThree = 3;

  const stepperValidator: any = (val: any) => {
    switch (val) {
      case initialStep:
        return adValidation;
      case stepOne:
        return taregtValidation;
      case stepTwo:
        return budgetValidation;
      case stepThree:
        return autoValidation;
    }
  };
  const steppeDefaultValues: any = (val: any) => {
    switch (val) {
      case initialStep:
        return adDefaultValues;
      case stepOne:
        return targetDefaultValues;
      case stepTwo:
        return budgetDefaultValues;
      case stepThree:
        return autoDefaultValues;
    }
  };

  const stepperImages: any = (val: any) => {
    switch (val) {
      case initialStep:
        return MockEngagementTabsImage;
      case stepOne:
        return BudgetScheduleMockImage;
      case stepTwo:
        return BudgetScheduleMockImage;
      case stepThree:
        return BudgetScheduleMockImage;
    }
  };

  const methods = useForm({
    resolver: yupResolver(stepperValidator(activeStep)),
    defaultValues: steppeDefaultValues(activeStep),
  });
  const { handleSubmit, watch } = methods;
  const isNewAd = watch('creative') ? watch('creative') : 'existingAd';

  return {
    initialStep,
    stepThree,
    router,
    activeStep,
    setActiveStep,
    handleBack,
    handleNext,
    stepperValidator,
    steppeDefaultValues,
    methods,
    handleSubmit,
    isNewAd,
    stepperImages,
  };
};

export default useTempStepper;
