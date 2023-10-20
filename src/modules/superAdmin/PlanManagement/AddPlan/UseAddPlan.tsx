import { useState } from 'react';

import { useRouter } from 'next/router';

import AddPlanForm from './Forms/PlanForm';
import PlanFeaturesForm from './Forms/PlanFeatures';
import Modules from './Forms/Modules';

import { v4 as uuidv4 } from 'uuid';

export const UseAddPlan = () => {
  const [addPlanFormValues, setAddPlanFormValues] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const router = useRouter();

  const hanldeGoBack = () => {
    router.back();
  };

  const AddPlanStepperData = [
    {
      key: uuidv4(),
      label: 'Plan Form',
      component: <AddPlanForm />,
      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
    {
      key: uuidv4(),
      label: 'Plan Features',
      component: <PlanFeaturesForm />,
      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
    {
      key: uuidv4(),
      label: 'Modules',
      component: <Modules />,
      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
  ];

  const handleCompleteStep = () => {
    // TODO: check for form error and return otherwise

    // console.log("activeStep========> ", activeStep);
    // console.log("AddPlanStepperData?.length ========> ", AddPlanStepperData?.length);

    if (activeStep == AddPlanStepperData?.length - 1) {
      // setActiveStep(0);
      router.push('/super-admin/plan-management');
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const hanldeGoPreviousBack = () => {
    if (activeStep === 0) {
      router.push('/super-admin/plan-management');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return {
    addPlanFormValues,
    setAddPlanFormValues,
    AddPlanStepperData,
    hanldeGoBack,
    activeStep,
    hanldeGoPreviousBack,
    handleCompleteStep,
  };
};
