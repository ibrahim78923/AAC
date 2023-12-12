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

  const stepperValidator: any = (val: any) => {
    switch (val) {
      case 0:
        return adValidation;
      case 1:
        return taregtValidation;
      case 2:
        return budgetValidation;
      case 3:
        return autoValidation;
    }
  };
  const steppeDefaultValues: any = (val: any) => {
    switch (val) {
      case 0:
        return adDefaultValues;
      case 1:
        return targetDefaultValues;
      case 2:
        return budgetDefaultValues;
      case 3:
        return autoDefaultValues;
    }
  };

  const stepperImages: any = (val: any) => {
    switch (val) {
      case 0:
        return MockEngagementTabsImage;
      case 1:
        return BudgetScheduleMockImage;
      case 2:
        return BudgetScheduleMockImage;
      case 3:
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
