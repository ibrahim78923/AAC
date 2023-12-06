import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import Ad from './StepperComponent/Ad';
import Targeting from './StepperComponent/Targeting';
import { v4 as uuidv4 } from 'uuid';
import BudgetAndSchedule from './StepperComponent/BudgetAndSchedule/BudgetAndSchedule';
import Automation from './StepperComponent/Automation';

const useEngagementAd = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const engagamentAdStepperData: any = [
    {
      key: uuidv4(),
      label: 'Ad',
      component: <Ad />,
    },
    {
      key: uuidv4(),
      label: 'Targeting',
      component: <Targeting />,
    },
    {
      key: uuidv4(),
      label: 'Budget & Shedule',
      component: <BudgetAndSchedule />,
    },
    {
      key: uuidv4(),
      label: 'Automation',
      component: <Automation />,
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

export default useEngagementAd;
