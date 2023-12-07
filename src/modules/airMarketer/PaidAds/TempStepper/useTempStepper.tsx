import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import First from './First';
import Second from './Second';
import Third from './Third';
import { AIR_MARKETER } from '@/routesConstants/paths';

const useTempStepper = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const engagamentAdStepperData: any = [
    {
      key: uuidv4(),
      label: 'Ad',
      component: <First />,
    },
    {
      key: uuidv4(),
      label: 'Targeting',
      component: <Second />,
    },
    {
      key: uuidv4(),
      label: 'Budget & Shedule',
      component: <Third />,
    },
  ];

  const handleCompleteStep = () => {
    if (activeStep == engagamentAdStepperData?.length - 1) {
      router.push(AIR_MARKETER?.PAID_ADS);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const hanldeGoPreviousBack = () => {
    if (activeStep === 0) {
      router.push(AIR_MARKETER?.CREATE_AD);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return {
    activeStep,
    setActiveStep,
    engagamentAdStepperData,
    handleCompleteStep,
    hanldeGoPreviousBack,
  };
};

export default useTempStepper;
