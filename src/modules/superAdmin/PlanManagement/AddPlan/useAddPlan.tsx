import { useState } from 'react';
import { useRouter } from 'next/router';

import Modules from './Forms/Modules';
import AddPlanForm from './Forms/PlanForm';
import PlanFeaturesForm from './Forms/PlanFeatures';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';
import { enqueueSnackbar } from 'notistack';
import {
  defaultValues,
  defaultValuesFunction,
  gpDetailsInfoFormSchema,
} from './Forms/PlanForm/PlanForm.data';

export const useAddPlan = () => {
  const [addPlanFormValues, setAddPlanFormValues] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const router = useRouter();

  const hanldeGoBack = () => {
    router.back();
  };

  // Add Plan Form Method
  const methods: any = useForm({
    resolver: yupResolver(gpDetailsInfoFormSchema),
    defaultValues: defaultValuesFunction(defaultValues),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values?: any) => {
    setAddPlanFormValues(values);
    // localStorage.setItem('addPlanFormsData', JSON.stringify(values));

    // Add query parameter to URL
    // router.push({ pathname: router.pathname, query: { submitted: true } });
    enqueueSnackbar('Form Submitted', {
      variant: 'success',
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const AddPlanStepperData = [
    {
      key: uuidv4(),
      label: 'Plan Form',
      component: <AddPlanForm />,
      submit: true,
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
    if (activeStep == AddPlanStepperData?.length - 1) {
      router.push('/super-admin/plan-management');
      return;
    }
    if (AddPlanStepperData[activeStep]?.submit) {
      handleFormSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const hanldeGoPreviousBack = () => {
    if (activeStep === 0) {
      router.push('/super-admin/plan-management');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return {
    methods,
    onSubmit,
    activeStep,
    handleSubmit,
    hanldeGoBack,
    handleFormSubmit,
    addPlanFormValues,
    AddPlanStepperData,
    handleCompleteStep,
    setAddPlanFormValues,
    hanldeGoPreviousBack,
  };
};
