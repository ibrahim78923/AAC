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
  clearState,
} from '@/redux/slices/planManagement/planManagementSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';

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
import { indexNumbers, productSuiteName } from '@/constants';
import {
  DRAWER_TYPES,
  IMPORT_ACTION_TYPE,
  PLAN_STATUS,
} from '@/constants/strings';

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

  const handleChangeSubModule = (subModule: string) => {
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
  const [checkQuery, setCheckQuery] = useState(query?.type);
  let parsedRowData: any;
  if (router?.query?.data) {
    parsedRowData = JSON.parse(router?.query?.data);
  }
  const {
    data: singlePlan,
    isSuccess,
    isLoading: GetsinglePlanLoading,
  } = useGetPlanMangementByIdQuery(
    {
      id: parsedRowData?._id,
    },
    { skip: isNullOrEmpty(parsedRowData) },
  );

  const dispatch = useDispatch();
  const hanldeGoBack = () => {
    router?.back();
    dispatch(clearState());
  };

  const methods: any = useForm({
    resolver: yupResolver(gpDetailsInfoFormSchema),
    defaultValues: defaultValues,
  });

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
            allowAdditionalUsers:
              additionalPerUserPrice > indexNumbers?.ZERO
                ? PLAN_STATUS?.YES
                : PLAN_STATUS?.NO,
            allowAdditionalStorage:
              additionalStoragePrice > indexNumbers?.ZERO
                ? PLAN_STATUS?.YES
                : PLAN_STATUS?.NO,
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
  const AdditionalStorage = watch(['allowAdditionalStorage']);
  const AdditionalUser = watch(['allowAdditionalUsers']);
  const checkValueAdditionalStoragePrice = watch(['additionalStoragePrice']);
  const checkValueAdditionalPerUserPrice = watch(['additionalPerUserPrice']);

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
  if (selectProductSuite === IMPORT_ACTION_TYPE?.PRODUCT) {
    const { data } = useGetPlanIdQuery<any>(
      { params: queryParameters },
      { skip: isNullOrEmpty(planTypeId) },
    );
    planExist = data;
  }

  const planForm: any = useAppSelector(
    (state) => state?.planManagementForms?.addPlanForm,
  );
  const featureDetails: any = useAppSelector(
    (state) => state?.planManagementForms?.featureDetails,
  );
  const featuresFormData: any = useAppSelector(
    (state) => state?.planManagementForms?.planFeature,
  );
  const { data: modulesData } = useGetPermissionsByProductsQuery(
    {
      id: productIdModules,
      skip,
    },
    { skip: isNullOrEmpty(productIdModules) },
  );

  const onSubmitPlan = async (values: any) => {
    if (
      values?.suite?.length > indexNumbers?.ZERO &&
      values?.suite?.length < indexNumbers?.TWO
    ) {
      enqueueSnackbar('Please select more then one product', {
        variant: 'error',
      });
    } else if (
      values?.suite?.length < indexNumbers?.TWO &&
      isNullOrEmpty(values?.productId)
    ) {
      enqueueSnackbar('Please select product', {
        variant: 'error',
      });
    } else if (
      values?.allowAdditionalUsers === PLAN_STATUS?.YES &&
      isNullOrEmpty(values?.additionalPerUserPrice)
    ) {
      enqueueSnackbar('Please enter additional Per User Price', {
        variant: 'error',
      });
    } else if (
      values?.allowAdditionalUsers === PLAN_STATUS?.YES &&
      values?.additionalPerUserPrice <= indexNumbers?.ZERO
    ) {
      enqueueSnackbar('Please enter positive number', {
        variant: 'error',
      });
    } else if (
      values?.allowAdditionalStorage === PLAN_STATUS?.YES &&
      isNullOrEmpty(values?.additionalStoragePrice)
    ) {
      enqueueSnackbar('Please enter additional Storage Price', {
        variant: 'error',
      });
    } else if (
      values?.allowAdditionalStorage === PLAN_STATUS?.YES &&
      values?.additionalStoragePrice <= indexNumbers?.ZERO
    ) {
      enqueueSnackbar('Please enter positive number', {
        variant: 'error',
      });
    } else if (isNullOrEmpty(crmValue) && !isNullOrEmpty(values?.suite)) {
      enqueueSnackbar('Please enter CRM Name', {
        variant: 'error',
      });
    } else {
      if (
        !isNullOrEmpty(singlePlan) &&
        values?.productId?.length > indexNumbers?.ONE
      ) {
        values.suite = values?.productId;
      }
      dispatch(addPlanFormData(values));
      setActiveStep((previous) => previous + indexNumbers?.ONE);

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

    if (singlePlan && checkQuery === DRAWER_TYPES?.EDIT) {
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
    let addExtraFeatures: any;
    let featuresData;
    if (selectProductSuite != IMPORT_ACTION_TYPE?.PRODUCT) {
      featuresData = planForm?.suite?.map((productIdItem: any) => {
        return {
          features: values?.features
            ?.map((item: any) => {
              const productId = productFeatures?.data?.productfeatures?.find(
                (id: any) => id?._id === item,
              );
              addExtraFeatures = '';
              if (featureDetails?.featureId === item) {
                addExtraFeatures =
                  featureDetails?.values?.dealsAssociationsDetail;
              }
              if (productId?.productId === productIdItem) {
                return {
                  dealsAssociationsDetail: addExtraFeatures,

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
          addExtraFeatures = '';
          if (featureDetails?.featureId === item) {
            addExtraFeatures = featureDetails?.values?.dealsAssociationsDetail;
          }
          return {
            dealsAssociationsDetail: addExtraFeatures,
            featureId: item,
          };
        }),
        productId: planForm?.productId || null,
      };
    }
    dispatch(planFeaturesFormData(featuresData));
    setActiveStep((previous) => previous + indexNumbers?.ONE);
    enqueueSnackbar('Plan Features Details Added Successfully', {
      variant: 'success',
    });
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
    if (activeStep == AddPlanStepperData?.length - indexNumbers?.ONE) {
      const planFormData = {
        ...(selectProductSuite === IMPORT_ACTION_TYPE?.PRODUCT
          ? { productId: planForm?.productId }
          : { suite: planForm?.suite }),
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

      const planPermission = values?.permissionSlugs.reduce(
        (acc: any, item: any) => {
          const [productId, permissionSlug] = item.split(':');
          const existingProduct = acc?.find(
            (entry: any) => entry?.productId === productId,
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
        },
        [],
      );

      const transformedModulesFormData = { planPermission };
      let res: any;
      try {
        parsedRowData
          ? (res = await updatePlanMangement({
              id: parsedRowData?._id,
              body: {
                ...planFormData,
                ...(selectProductSuite === productSuiteName?.crm && {
                  name: crmValue,
                }),
                planFeature:
                  selectProductSuite === productSuiteName?.crm
                    ? featuresFormData
                    : [featuresFormData],
                ...transformedModulesFormData,
              },
            })?.unwrap())
          : (res = await postPlanMangement({
              body: {
                ...planFormData,
                planFeature:
                  selectProductSuite === productSuiteName?.crm
                    ? featuresFormData
                    : [featuresFormData],
                ...transformedModulesFormData,
              },
            })?.unwrap());
        if (res) {
          setCheckQuery('');
          enqueueSnackbar(
            parsedRowData
              ? 'Plan Updated Successfully'
              : 'Plan Added Successfully',
            {
              variant: 'success',
            },
          );
          dispatch(setFeatureDetails(''));
          reset();
          router?.push(SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_MANAGEMENT_GRID);
        }
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
          AdditionalStorageValue={AdditionalStorage}
          AdditionalUsereValue={AdditionalUser}
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
          isLoading={isLoading}
          updatePlanLoading={updatePlanLoading}
        />
      ),
      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
  ];

  const hanldeGoPreviousBack = () => {
    if (activeStep === indexNumbers?.ZERO) {
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

  const AdditionalStorageValue = AdditionalStorage[indexNumbers?.ZERO];
  const AdditionalUserValue = AdditionalUser[indexNumbers?.ZERO];

  useEffect(() => {
    if (AdditionalStorageValue === PLAN_STATUS?.NO) {
      setValue('additionalStoragePrice', 0);
    } else if (
      AdditionalStorageValue === PLAN_STATUS?.YES &&
      checkValueAdditionalStoragePrice[indexNumbers?.ZERO] ===
        indexNumbers?.ZERO
    ) {
      setValue('additionalStoragePrice', indexNumbers?.ONE);
    }
    if (
      AdditionalUserValue === PLAN_STATUS?.YES &&
      checkValueAdditionalPerUserPrice[indexNumbers?.ZERO] ===
        indexNumbers?.ZERO
    ) {
      setValue('additionalPerUserPrice', indexNumbers?.ONE);
    } else if (AdditionalUserValue === PLAN_STATUS?.NO) {
      setValue('additionalPerUserPrice', indexNumbers?.ZERO);
    }
  }, [AdditionalStorageValue, AdditionalUserValue]);

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
    GetsinglePlanLoading,
  };
};
