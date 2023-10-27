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
import { persistStore } from 'redux-persist';
import store from '@/redux/store';
import {
  defaultValuesFeatures,
  validationSchemaFeatures,
} from './Forms/PlanFeatures/FeaturesModal/FeaturesModal.data';

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

  // const handlePlanSubmit = handleSubmit(onSubmit);

  const persistor = persistStore(store);

  const methodsPlan: any = useForm({
    resolver: yupResolver(gpDetailsInfoFormSchema),
    defaultValues: defaultValues,
  });
  const methodsPlanFeatures: any = useForm({
    resolver: yupResolver(validationSchemaFeatures),
    defaultValues: defaultValuesFeatures,
  });
  const { handleSubmit, reset } = methodsPlan;
  const { handleSubmit: handleSubmitPlanFeatures } = methodsPlanFeatures;

  // console.log("addPlanFormValues-----------> ", addPlanFormValues);

  const onSubmitPlan = async (values: any) => {
    // console.log("addPlanFormValues=======> ", addPlanFormValues);
    dispatch(addPlanFormData(values));
    setActiveStep((previous) => previous + 1);
    // console.log(values)
    enqueueSnackbar('Dashboard Created Successfully', {
      variant: 'success',
    });
    reset();
  };
  const onSubmitPlanFeaturesHandler = async (values: any) => {
    // console.log("addPlanFormValues=======> ", addPlanFormValues);
    dispatch(addPlanFormData(values));
    setActiveStep((previous) => previous + 1);
    // console.log(values)
    enqueueSnackbar('Dashboard Created Successfully', {
      variant: 'success',
    });
    reset();
  };

  const handlePlanForm = handleSubmit(onSubmitPlan);
  const handlePlanFeatures = handleSubmitPlanFeatures(
    onSubmitPlanFeaturesHandler,
  );
  const handleCompleteStep = () => {
    handlePlanForm();

    if (activeStep == AddPlanStepperData?.length - 1) {
      reset();
      persistor.purge();
      router.push('/super-admin/plan-management');
      return;
    }
  };

  const AddPlanStepperData = [
    {
      key: uuidv4(),
      label: 'Plan Form',
      component: (
        <AddPlanForm methods={methodsPlan} handleSubmit={handlePlanForm} />
      ),

      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
    {
      key: uuidv4(),
      label: 'Plan Features',
      component: (
        <PlanFeaturesForm
          methods={methodsPlanFeatures}
          handleSubmit={handlePlanFeatures}
        />
      ),
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
