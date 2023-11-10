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
import {
  addPlanFormData,
  planFeaturesFormData,
  modulesFormData,
} from '@/redux/slices/planManagement/planManagementSlice';
import { useDispatch } from 'react-redux';
import { persistStore } from 'redux-persist';
import store, { useAppSelector } from '@/redux/store';
import {
  defaultValuesFeatures,
  validationSchemaFeatures,
} from './Forms/PlanFeatures/FeaturesModal/FeaturesModal.data';
import { usePostPlanMangementMutation } from '@/services/superAdmin/plan-mangement';

export const useAddPlan = () => {
  const [addPlanFormValues, setAddPlanFormValues] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const [postPlanMangement] = usePostPlanMangementMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  const hanldeGoBack = () => {
    router?.back();
  };

  const methods: any = useForm({
    resolver: yupResolver(gpDetailsInfoFormSchema),
    defaultValues: defaultValues,
  });

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
  const { handleSubmit: handleSubmitPlanModules } = methodsPlanFeatures;

  const planForm: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.addPlanForm,
  );
  const featureDetails: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.featureDetails,
  );
  const featursFormData: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.planFeaturesForm,
  );
  const slugsDataModules: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement,
  );

  const onSubmitPlan = async (values: any) => {
    dispatch(addPlanFormData(values));
    setActiveStep((previous) => previous + 1);

    enqueueSnackbar('Plan Details Added Successfully', {
      variant: 'success',
    });
    reset();
  };
  const onSubmitPlanFeaturesHandler = async (values: any) => {
    dispatch(planFeaturesFormData(values));
    setActiveStep((previous) => previous + 1);
    enqueueSnackbar('Plan Features Details Added Successfully', {
      variant: 'success',
    });
    reset();
  };

  const onSubmitPlanModulesHandler = async (values: any) => {
    dispatch(modulesFormData(values));
    if (activeStep == AddPlanStepperData?.length - 1) {
      const featuresData = [featureDetails];
      const planPermission = slugsDataModules;
      const planManagementPayload = {
        ...planForm,
        ...featursFormData,
        featuresData,
        planPermission,
      };
      try {
        postPlanMangement({ body: planManagementPayload })?.unwrap();
        enqueueSnackbar('Plan Modules Details Added Successfully', {
          variant: 'success',
        });
        persistor?.purge();
        reset();
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    }

    reset();
  };

  const handlePlanForm = handleSubmit(onSubmitPlan);
  const handlePlanFeatures = handleSubmitPlanFeatures(
    onSubmitPlanFeaturesHandler,
  );
  const handlePlanModules = handleSubmitPlanModules(onSubmitPlanModulesHandler);

  const handleCompleteStep = () => {
    if (activeStep === 0) {
      handlePlanForm();
    }
    if (activeStep === 1) {
      handlePlanFeatures();
    }

    if (activeStep === 2) {
      handlePlanModules();
      reset();
      persistor?.purge();
      router?.push('/super-admin/plan-management');
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
