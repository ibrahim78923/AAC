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
  gpDetailsInfoFormSchema,
} from './Forms/PlanForm/PlanForm.data';
import { addPlanFormData } from '@/redux/slices/planManagement/planManagementSlice';
import { useDispatch } from 'react-redux';

export const useAddPlan = () => {
  const [addPlanFormValues, setAddPlanFormValues] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const router = useRouter();
  const dispatch = useDispatch();
  const hanldeGoBack = () => {
    router.back();
  };

  const methods: any = useForm({
    resolver: yupResolver(gpDetailsInfoFormSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const handleCompleteStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleSubmit(async (values: any) => {
      dispatch(addPlanFormData(values));
      enqueueSnackbar('Plan Added Successfully', {
        variant: 'success',
      });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      reset();
    })();
    if (activeStep == AddPlanStepperData?.length - 1) {
      router.push('/super-admin/plan-management');
      return;
    }
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

  const hanldeGoPreviousBack = () => {
    if (activeStep === 0) {
      router.push('/super-admin/plan-management');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return {
    methods,

    activeStep,
    handleSubmit,
    hanldeGoBack,

    addPlanFormValues,
    AddPlanStepperData,
    handleCompleteStep,
    setAddPlanFormValues,
    hanldeGoPreviousBack,
  };
};
