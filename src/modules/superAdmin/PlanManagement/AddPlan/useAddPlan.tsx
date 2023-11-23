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
  useGetProductsFeaturesAllQuery,
  usePostPlanMangementMutation,
  useUpdatePlanMangementMutation,
} from '@/services/superAdmin/plan-mangement';
import {
  defaultValuesModules,
  defaultValuesPlanFeatures,
  validationSchemaModules,
  validationSchemaPlanFeatures,
} from './Forms/Modules/PlanFeatures.data';
import { isNullOrEmpty } from '@/utils';
import { SUPER_ADMIN_PLAN_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const useAddPlan = () => {
  const [addPlanFormValues, setAddPlanFormValues] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const [postPlanMangement] = usePostPlanMangementMutation();
  const [updatePlanMangement] = useUpdatePlanMangementMutation();
  const router: any = useRouter();
  let parsedRowData: any;
  if (router.query.data) {
    parsedRowData = JSON.parse(router.query.data);
  }

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
    defaultValues: async () => {
      if (parsedRowData) {
        const {
          defaultUsers,
          defaultStorage,
          planPrice,
          additionalPerUserPrice,
          additionalStoragePrice,
          description,
          allowAdditionalUsers,
          allowAdditionalStorage,
          planProducts,
          planType,
        } = parsedRowData;
        if (!isNullOrEmpty(planProducts)) {
          const productId = planProducts[0].name;
          const planTypeId = { value: planType?.name, label: planType?.name };
          return {
            defaultUsers,
            defaultStorage,
            planPrice,
            additionalPerUserPrice,
            additionalStoragePrice,
            description,
            allowAdditionalUsers,
            allowAdditionalStorage,
            productId,
            planTypeId,
          };
        }
      }
      return defaultValues;
    },
  });
  const methodsPlanFeatures: any = useForm({
    resolver: yupResolver(validationSchemaPlanFeatures),
    defaultValues: defaultValuesPlanFeatures,
  });
  const methodsPlanModules: any = useForm({
    resolver: yupResolver(validationSchemaModules),
    defaultValues: defaultValuesModules,
  });

  const { handleSubmit, reset } = methodsPlan;
  const { handleSubmit: handleSubmitPlanFeatures } = methodsPlanFeatures;
  const { handleSubmit: handleSubmitPlanModules } = methodsPlanModules;

  const planForm: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.addPlanForm,
  );
  const featureDetails: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.featureDetails,
  );
  const featuresFormData: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.planFeature,
  );
  const { data, isSuccess } = useGetProductsFeaturesAllQuery({});
  let productFeatures: any;
  if (isSuccess) {
    productFeatures = data;
  }

  const onSubmitPlan = async (values: any) => {
    dispatch(addPlanFormData(values));
    setActiveStep((previous) => previous + 1);

    enqueueSnackbar('Plan Details Added Successfully', {
      variant: 'success',
    });
    reset();
  };
  const onSubmitPlanFeaturesHandler = async (values: any) => {
    const featuresData = values?.features?.map((item: any) => {
      const productId = productFeatures?.data?.productfeatures?.find(
        (id: any) => id?._id === item,
      );

      return {
        features: [
          {
            dealsAssociationsDetail: featureDetails?.dealsAssociationsDetail,
            featureId: item,
          },
        ],
        productId: productId?.productId || null, // Use null or a default value if productId is not found
      };
    });
    dispatch(planFeaturesFormData(featuresData));
    setActiveStep((previous) => previous + 1);
    enqueueSnackbar('Plan Features Details Added Successfully', {
      variant: 'success',
    });
    reset();
  };

  const onSubmitPlanModulesHandler = async (values: any) => {
    const permissionSlugToFind: any = values?.permissionSlugs;
    const productNamesWithPermissions: any = [];

    SUPER_ADMIN_PLAN_MANAGEMENT_PERMISSIONS?.forEach((permissionData) => {
      permissionData.Sub_Modules?.forEach((subModule) => {
        const matchingPermissions = subModule?.permissions.filter(
          (permission) => permissionSlugToFind?.includes(permission?.value),
        );

        if (!isNullOrEmpty(matchingPermissions)) {
          productNamesWithPermissions?.push(permissionData?.ProductName);
        }
      });
    });

    const modulesPermissionsData = productNamesWithPermissions?.map(
      (item: any) => {
        const productId = productFeatures?.data?.productfeatures?.find(
          (id: any) => id?.productName === item,
        );

        return {
          permissionSlugs: values?.permissionSlugs,
          productId: productId?.productId || null, // Use null or a default value if productId is not found
        };
      },
    );

    dispatch(modulesFormData(values));
    if (activeStep == AddPlanStepperData?.length - 1) {
      const planFormData = {
        //we are getting array when we select options in searchable select
        productId: planForm?.productId[0],

        ...(isNullOrEmpty(planForm?.productId) && { suite: planForm?.suite }),
        planTypeId: planForm?.planTypeId,
        description: planForm?.description,
        defaultUsers: parseInt(planForm?.defaultUsers),
        defaultStorage: parseInt(planForm?.defaultStorage),
        planPrice: parseInt(planForm?.planPrice),
        additionalPerUserPrice: parseInt(planForm?.additionalPerUserPrice),
        additionalStoragePrice: parseInt(planForm?.additionalStoragePrice),
        allowAdditionalUsers: planForm?.allowAdditionalUsers,
        allowAdditionalStorage: planForm?.allowAdditionalStorage,
      };
      const planFeaturesFormData = featuresFormData?.map(
        (item: any) =>
          item?.features?.map((feature: any) => ({
            features: [
              {
                dealsAssociationsDetail:
                  featureDetails?.dealsAssociationsDetail,
                featureId: feature?.featureId,
              },
            ],
            productId: item?.productId,
          })),
      );

      const transformedFeaturesFormData = {
        planFeature: planFeaturesFormData?.flat()?.map((item: any) => ({
          features: item?.features,
          productId: item?.productId,
        })),
      };
      const transformedModulesFormData = {
        planPermission: modulesPermissionsData?.flat()?.map((item: any) => ({
          permissionSlugs: item?.permissionSlugs,
          productId: item?.productId,
        })),
      };
      try {
        parsedRowData
          ? updatePlanMangement({
              id: parsedRowData?._id,
              body: {
                ...planFormData,
                ...transformedFeaturesFormData,
                ...transformedModulesFormData,
              },
            })
          : postPlanMangement({
              body: {
                ...planFormData,
                ...transformedFeaturesFormData,
                ...transformedModulesFormData,
              },
            })?.unwrap();
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
      component: (
        <Modules
          methods={methodsPlanModules}
          handleSubmit={handlePlanModules}
        />
      ),
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
