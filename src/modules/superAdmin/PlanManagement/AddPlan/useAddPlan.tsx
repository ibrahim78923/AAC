import { useEffect, useState } from 'react';
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
  useGetPermissionsByProductsQuery,
  useGetPlanMangementByIdQuery,
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
  const [skip, setSkip] = useState(true);
  const [productIdModules, setProductIdModules] = useState([]);

  const [postPlanMangement] = usePostPlanMangementMutation();
  const [updatePlanMangement] = useUpdatePlanMangementMutation();
  const router: any = useRouter();
  let parsedRowData: any;
  if (router.query.data) {
    parsedRowData = JSON.parse(router.query.data);
  }
  const { data: singlePlan } = useGetPlanMangementByIdQuery({
    id: parsedRowData?._id,
  });

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
          planProducts,
          planType,
        } = parsedRowData;
        if (!isNullOrEmpty(planProducts)) {
          const productId = planProducts[0]._id;
          const planTypeId = { value: planType?.name, label: planType?.name };
          return {
            defaultUsers,
            defaultStorage,
            planPrice,
            additionalPerUserPrice,
            additionalStoragePrice,
            description,
            allowAdditionalUsers: !isNullOrEmpty(additionalPerUserPrice)
              ? 'Yes'
              : 'No',
            allowAdditionalStorage: !isNullOrEmpty(additionalStoragePrice)
              ? 'Yes'
              : 'No',
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

  const { handleSubmit, reset, watch, setValue } = methodsPlan;
  const { handleSubmit: handleSubmitPlanFeatures } = methodsPlanFeatures;
  const { handleSubmit: handleSubmitPlanModules } = methodsPlanModules;
  const AdditionalStorageValue = watch(['allowAdditionalStorage']);
  const AdditionalUsereValue = watch(['allowAdditionalUsers']);

  useEffect(() => {
    if (AdditionalStorageValue[0] === 'No') {
      setValue('additionalStoragePrice', '');
    } else if (AdditionalUsereValue[0] === 'No') {
      setValue('additionalPerUserPrice', '');
    }
  }, [AdditionalStorageValue, AdditionalUsereValue, setValue]);

  const planForm: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.addPlanForm,
  );
  const featureDetails: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.featureDetails,
  );
  const featuresFormData: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.planFeature,
  );
  // const { data, isSuccess } = useGetProductsFeaturesAllQuery({});
  const { data: modulesData } = useGetPermissionsByProductsQuery({
    id: productIdModules,
    skip,
  });
  // let productFeatures: any;
  // if (isSuccess) {
  //   productFeatures = data;
  // }

  const onSubmitPlan = async (values: any) => {
    dispatch(addPlanFormData(values));
    setActiveStep((previous) => previous + 1);

    enqueueSnackbar('Plan Details Added Successfully', {
      variant: 'success',
    });
    const productIdArray = values?.suite;
    const modulesPermissionsArray = [];
    if (!isNullOrEmpty(productIdArray)) {
      for (const productId of productIdArray) {
        setSkip(false);
        setProductIdModules(productId);

        modulesPermissionsArray?.push(modulesData);
      }
    }

    reset();
  };
  const onSubmitPlanFeaturesHandler = async (values: any) => {
    const featuresData = values?.features?.map((item: any) => {
      // const productId = productFeatures?.data?.productfeatures?.find(
      //   (id: any) => id?._id === item,
      // );

      return {
        features: [
          {
            dealsAssociationsDetail: featureDetails?.dealsAssociationsDetail,
            featureId: item,
          },
        ],
        productId: planForm?.productId || null,
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
        const matchingPermissions = subModule?.permissions?.filter(
          (permission) => permissionSlugToFind?.includes(permission?.value),
        );

        if (!isNullOrEmpty(matchingPermissions)) {
          productNamesWithPermissions?.push(permissionData?.ProductName);
        }
      });
    });

    dispatch(modulesFormData(values));
    if (activeStep == AddPlanStepperData?.length - 1) {
      const planFormData = {
        //Todo: getting product id at index 0
        productId: planForm?.productId,

        ...(isNullOrEmpty(planForm?.productId) && { suite: planForm?.suite }),
        planTypeId: planForm?.planTypeId,
        description: planForm?.description,
        defaultUsers: parseInt(planForm?.defaultUsers),
        defaultStorage: parseInt(planForm?.defaultStorage),
        planPrice: parseInt(planForm?.planPrice),
        additionalPerUserPrice: parseInt(planForm?.additionalPerUserPrice),
        additionalStoragePrice: parseInt(planForm?.additionalStoragePrice),
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
        planPermission: [
          {
            permissionSlugs: values?.permissionSlugs,
            //Todo: getting product id at index 0
            productId: planForm?.productId,
          },
        ],
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
        setTimeout(function () {
          enqueueSnackbar('Plan Added Successfully', {
            variant: 'success',
          });
        }, 3000);
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
        <AddPlanForm
          methods={methodsPlan}
          handleSubmit={handlePlanForm}
          AdditionalStorageValue={AdditionalStorageValue}
          AdditionalUsereValue={AdditionalUsereValue}
        />
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
          editPlan={singlePlan?.data}
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
