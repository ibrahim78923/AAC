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
  setFeatureDetails,
} from '@/redux/slices/planManagement/planManagementSlice';
import { useDispatch } from 'react-redux';
import { persistStore } from 'redux-persist';
import store, { useAppSelector } from '@/redux/store';

import {
  useGetPermissionsByProductsQuery,
  useGetPlanMangementByIdQuery,
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
import {
  useGetExistingCrmQuery,
  useGetPlanIdQuery,
} from '@/services/superAdmin/billing-invoices';
import { SUPER_ADMIN_PLAN_MANAGEMENT } from '@/routesConstants/paths';
import { productSuiteName } from '@/constants';

export const useAddPlan = () => {
  const [addPlanFormValues, setAddPlanFormValues] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [skip, setSkip] = useState(true);
  const [productIdModules, setProductIdModules] = useState([]);
  const [crmValue, setCrmValue] = useState<any | null>(null);
  const [ifCrmExist, setIfCrmExist] = useState(false);
  const [selectProductSuite, setSelectProductSuite] = useState('product');
  const [selectedModule, setSelectedModule] = useState<string>();
  const [selectedSubModule, setSelectedSubModule] = useState<string>();

  const handleExpandAccordionChange = (module: string) => {
    if (module === selectedModule) {
      setSelectedModule('');
    } else {
      setSelectedModule(module);
    }
  };

  const handleChangeSubModule = (subModule) => {
    if (subModule === selectedSubModule) {
      setSelectedSubModule('');
    } else {
      setSelectedSubModule(subModule);
    }
  };

  const [postPlanMangement, isLoading] = usePostPlanMangementMutation();
  const [updatePlanMangement, { isLoading: updatePlanLoading }] =
    useUpdatePlanMangementMutation();
  const router: any = useRouter();
  const { query } = router;
  let parsedRowData: any;
  if (router?.query?.data) {
    parsedRowData = JSON.parse(router?.query?.data);
  }
  const { data: singlePlan, isSuccess } = useGetPlanMangementByIdQuery({
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
          let productId;
          let suite;

          singlePlan?.data?.isCRM
            ? (suite = planProducts?.map((product: any) => product?._id))
            : (productId = planProducts?.map((product: any) => product?._id));
          const planTypeId = planType?._id;
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
            suite,
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
  const { handleSubmit: handleSubmitPlanFeatures, setValue: setPlanFeatures } =
    methodsPlanFeatures;
  const {
    handleSubmit: handleSubmitPlanModules,
    formState: { errors },
    watch: watchPermissionSlugs,
    setValue: setPermissionSlugs,
  } = methodsPlanModules;
  const AdditionalStorageValue = watch(['allowAdditionalStorage']);
  const AdditionalUsereValue = watch(['allowAdditionalUsers']);

  const planTypeId = watch('planTypeId');
  const productId = watch('productId');

  const queryParameters = {
    planTypeId: planTypeId,
    productId:
      selectProductSuite === productSuiteName?.crm ? undefined : productId,
    name:
      selectProductSuite === productSuiteName?.crm
        ? crmValue?.label
        : undefined,
  };

  let crmData: any;

  if (selectProductSuite === productSuiteName?.crm) {
    const { data } = useGetExistingCrmQuery<any>(
      { params: queryParameters },
      { skip: isNullOrEmpty(planTypeId) },
    );
    crmData = data;
  }
  let planExist: any;
  if (selectProductSuite === 'product') {
    const { data } = useGetPlanIdQuery<any>(
      { params: queryParameters },
      { skip: isNullOrEmpty(planTypeId) },
    );
    planExist = data;
  }

  const planForm: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.addPlanForm,
  );
  const featureDetails: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.featureDetails,
  );
  const featuresFormData: any = useAppSelector(
    (state) => state?.planManagementForms?.planManagement?.planFeature,
  );
  const { data: modulesData } = useGetPermissionsByProductsQuery({
    id: productIdModules,
    skip,
  });

  const onSubmitPlan = async (values: any) => {
    if (values?.suite?.length > 0 && values?.suite?.length < 2) {
      enqueueSnackbar('Please select more then one product', {
        variant: 'error',
      });
    } else if (values?.suite?.length < 2 && isNullOrEmpty(values?.productId)) {
      enqueueSnackbar('Please select product', {
        variant: 'error',
      });
    } else if (
      values?.allowAdditionalUsers === 'Yes' &&
      isNullOrEmpty(values?.additionalPerUserPrice)
    ) {
      enqueueSnackbar('Please enter additional Per User Price', {
        variant: 'error',
      });
    } else if (
      values?.allowAdditionalStorage === 'Yes' &&
      isNullOrEmpty(values?.additionalStoragePrice)
    ) {
      enqueueSnackbar('Please enter additional Storage Price', {
        variant: 'error',
      });
    } else {
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
    }
  };
  useEffect(() => {
    if (singlePlan?.data?.isCRM) {
      setSelectProductSuite('CRM');
      setCrmValue(parsedRowData?.name);
    }

    if (singlePlan && query.type === 'edit') {
      const tempData = [...singlePlan?.data?.planProductPermissions];
      setPermissionSlugs(
        'permissionSlugs',

        tempData?.flatMap(
          (permission: any) =>
            permission?.permissionSlugs?.map(
              (slugObject: any) =>
                `${permission?.productId}:${slugObject?.slug}`,
            ),
        ),
      );
      setPlanFeatures(
        'features',
        singlePlan?.data?.planProductFeatures?.map(
          (obj: any) => obj?.featureId,
        ),
      );
    }
  }, [singlePlan]);
  const selectedPermission = watchPermissionSlugs('permissionSlugs');
  const getModulePermissions = (subModules: any) => {
    const permissions = subModules?.flatMap((firstItem: any) => {
      return firstItem?.permissions?.map(
        (item: any) => `${item?.productId}:${item?.slug}`,
      );
    });
    return permissions;
  };
  let permissionsArray: any = [];
  const selectAllPermissions = (subModules: any) => {
    const modulePermissions = getModulePermissions(subModules);
    if (
      !modulePermissions?.every(
        (permission: any) => selectedPermission?.includes(permission),
      )
    ) {
      permissionsArray = modulePermissions?.concat(selectedPermission);
    } else {
      permissionsArray = selectedPermission?.filter(
        (permission: any) => !modulePermissions?.includes(permission),
      );
    }
    setPermissionSlugs('permissionSlugs', permissionsArray);
  };

  const { data: productFeatures } = useGetProductsFeaturesAllQuery({
    id: planForm?.suite,
  });

  const onSubmitPlanFeaturesHandler = async (values: any) => {
    let featuresData;
    if (isNullOrEmpty(planForm?.productId)) {
      featuresData = planForm?.suite?.map((productIdItem: any) => {
        return {
          features: values?.features
            ?.map((item: any) => {
              const productId = productFeatures?.data?.productfeatures?.find(
                (id: any) => id?._id === item,
              );
              if (productId?.productId === productIdItem) {
                return {
                  dealsAssociationsDetail:
                    featureDetails?.dealsAssociationsDetail,
                  featureId: item,
                };
              }
              return undefined;
            })
            .filter(Boolean),
          productId: productIdItem,
        };
      });
    } else {
      featuresData = {
        features: values?.features?.map((item: any) => {
          return {
            dealsAssociationsDetail: featureDetails?.dealsAssociationsDetail,
            featureId: item,
          };
        }),
        productId: planForm?.productId || null,
      };
    }
    dispatch(planFeaturesFormData(featuresData));
    setActiveStep((previous) => previous + 1);
    enqueueSnackbar('Plan Features Details Added Successfully', {
      variant: 'success',
    });
    reset();
  };

  const onSubmitPlanModulesHandler = async (values: any) => {
    const permissionSlugToFind: any =
      values?.permissionSlugs ?? permissionsArray;
    const productNamesWithPermissions: any = [];

    SUPER_ADMIN_PLAN_MANAGEMENT_PERMISSIONS?.forEach((permissionData: any) => {
      permissionData.Sub_Modules?.forEach((subModule: any) => {
        const matchingPermissions = subModule?.permissions?.filter(
          (permission: any) =>
            permissionSlugToFind?.includes(permission?.value),
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
        ...(isNullOrEmpty(planForm?.productId) && {
          name: crmValue?.label,
        }),
        planTypeId: planForm?.planTypeId,
        description: planForm?.description,
        defaultUsers: parseInt(planForm?.defaultUsers),
        defaultStorage: parseInt(planForm?.defaultStorage),
        planPrice: parseInt(planForm?.planPrice),
        additionalPerUserPrice: parseInt(planForm?.additionalPerUserPrice),
        additionalStoragePrice: parseInt(planForm?.additionalStoragePrice),
      };

      // const planFeaturesFormData = featuresFormData?.features?.map(
      //   (item: any) =>
      //     item?.features?.map((feature: any) => ({
      //       features: [
      //         {
      //           dealsAssociationsDetail:
      //             featureDetails?.dealsAssociationsDetail,
      //           featureId: feature?.featureId,
      //         },
      //       ],
      //       productId: item?.productId,
      //     })),
      // );

      // const transformedFeaturesFormData = {
      //   planFeature: planFeaturesFormData?.flat()?.map((item: any) => ({
      //     features: item?.features,
      //     productId: item?.productId,
      //   })),
      // };

      const planPermission = values?.permissionSlugs.reduce((acc, item) => {
        const [productId, permissionSlug] = item.split(':');
        const existingProduct = acc?.find(
          (entry) => entry?.productId === productId,
        );

        if (existingProduct) {
          existingProduct?.permissionSlugs?.push(permissionSlug);
        } else {
          acc?.push({
            productId,
            permissionSlugs: [permissionSlug],
          });
        }

        return acc;
      }, []);

      const transformedModulesFormData = { planPermission };

      try {
        parsedRowData
          ? updatePlanMangement({
              id: parsedRowData?._id,
              body: {
                ...planFormData,
                planFeature:
                  selectProductSuite === productSuiteName?.crm
                    ? featuresFormData
                    : [featuresFormData],
                ...transformedModulesFormData,
              },
            })
          : postPlanMangement({
              body: {
                ...planFormData,
                planFeature:
                  selectProductSuite === productSuiteName?.crm
                    ? featuresFormData
                    : [featuresFormData],
                ...transformedModulesFormData,
              },
            })?.unwrap();
        setTimeout(function () {
          enqueueSnackbar(
            parsedRowData
              ? 'Plan Updated Successfully'
              : 'Plan Added Successfully',
            {
              variant: 'success',
            },
          );
        }, 5000);
        router?.push(SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_MANAGEMENT_GRID);
        dispatch(setFeatureDetails(''));
        // persistor?.purge();
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
          crmValue={crmValue}
          setCrmValue={setCrmValue}
          selectProductSuite={selectProductSuite}
          setSelectProductSuite={setSelectProductSuite}
          isSuccess={isSuccess}
          editPlan={singlePlan?.data}
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
          errors={errors}
          selectAllPermissions={selectAllPermissions}
          getModulePermissions={getModulePermissions}
          selectedPermission={selectedPermission}
          editPlan={singlePlan?.data}
          handleExpandAccordionChange={handleExpandAccordionChange}
          handleChangeSubModule={handleChangeSubModule}
          selectedModule={selectedModule}
          selectedSubModule={selectedSubModule}
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

  useEffect(() => {
    if (
      !isNullOrEmpty(crmData?.data?.plans) &&
      isNullOrEmpty(router?.query?.data)
    ) {
      enqueueSnackbar(
        'Plan with same CRM/Suite name and same Plantype has already exist',
        {
          variant: 'error',
        },
      );
      setIfCrmExist(true);
    } else {
      setIfCrmExist(false);
    }

    if (
      !isNullOrEmpty(planExist?.data?.plans) &&
      isNullOrEmpty(router?.query?.data)
    ) {
      enqueueSnackbar(
        'Plan with selected product and selected Plantype has already exist',
        {
          variant: 'error',
        },
      );
      setIfCrmExist(true);
    } else {
      setIfCrmExist(false);
    }
  }, [crmData, planExist]);

  useEffect(() => {
    if (AdditionalStorageValue[0] === 'No') {
      setValue('additionalStoragePrice', 0);
    } else if (AdditionalUsereValue[0] === 'No') {
      setValue('additionalPerUserPrice', 0);
    }
  }, [AdditionalStorageValue, AdditionalUsereValue, setValue]);

  return {
    methods,

    activeStep,
    handleSubmit,
    hanldeGoBack,
    watchPermissionSlugs,
    addPlanFormValues,
    AddPlanStepperData,
    handleCompleteStep,
    setAddPlanFormValues,
    hanldeGoPreviousBack,
    isLoading: isLoading?.isLoading,
    ifCrmExist,
    updatePlanLoading,
  };
};
