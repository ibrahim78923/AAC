import { useEffect, useState } from 'react';
import {
  BillingCycleEnum,
  defaultValues,
  validationSchema,
} from './EditForm.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetExistingCrmQuery,
  useGetPlanIdQuery,
  useGetPlanTypeQuery,
  usePatchBilingInvoicesMutation,
  usePostBilingInvoicesMutation,
} from '@/services/superAdmin/billing-invoices';
import { isNullOrEmpty } from '@/utils';
import { useGetCrmQuery } from '@/services/superAdmin/plan-mangement';
import {
  productSuiteName,
  SUBSCRIPTION_AND_INVOICES_ERROR_MESSAGES,
} from '@/constants';
import {
  GetCRM,
  ProductCRMI,
  SubmitValuesI,
  UseEditFormI,
} from './editForm.interface';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import dayjs from 'dayjs';

const useEditForm = ({
  isEditModal,
  isGetRowValues,
  onClose,
  setIsGetRowValues,
  setIsChecked,
}: UseEditFormI) => {
  const [selectProductSuite, setSelectProductSuite] = useState('product');
  const [isExistingPlan, setIsExistingPlan] = useState(false);
  const [isUserPrice, setIsUserPrice] = useState(true);
  const [isStoragePrice, setIsStoragePrice] = useState(true);

  const [addAssignPlan, { isLoading }] = usePostBilingInvoicesMutation();
  const [updateAssignPlan, { isLoading: isLoadingUpdate }] =
    usePatchBilingInvoicesMutation();

  const rowApiValues = {
    clientName: isGetRowValues?.cell?.row?.original?.organizations,
    product:
      isGetRowValues?.cell?.row?.original?.planProducts?.length > 1
        ? isGetRowValues?.cell?.row?.original?.plans?._id
        : isGetRowValues?.cell?.row?.original?.planProducts[0]?._id,
    planType: isGetRowValues?.cell?.row?.original?.plantypes?._id,
    planTypeSequenceOrder:
      isGetRowValues?.cell?.row?.original?.plantypes?.sequenceOrder,
    additionalUser: isGetRowValues?.cell?.row?.original?.additionalUsers,
    planPrice: isGetRowValues?.cell?.row?.original?.plans?.planPrice,
    defaultUser: isGetRowValues?.cell?.row?.original?.plans?.defaultUsers,
    defaultStorage: isGetRowValues?.cell?.row?.original?.plans?.defaultStorage,
    additionalStorage: isGetRowValues?.cell?.row?.original?.additionalStorage,
    discount: isGetRowValues?.cell?.row?.original?.planDiscount,
    billingCycle: isGetRowValues?.cell?.row?.original?.billingCycle,
    date: new Date(isGetRowValues?.cell?.row?.original?.billingDate),
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { data: getCRM } = useGetCrmQuery({});

  const crmOptions = getCRM?.data?.map((product: GetCRM) => ({
    value: product?._id,
    label: product?.name,
  }));

  const { handleSubmit, reset, watch, setValue } = methods;

  const productId = watch('product');
  const planTypeId = watch('planType');
  const organizationId = watch('clientName');
  const billingCycle = watch('billingCycle');

  useEffect(() => {
    if (billingCycle) {
      const currentBillingDate = new Date();
      const newBillingDate = calculateNewBillingDate(
        billingCycle as BillingCycleEnum,
        currentBillingDate,
      );
      setValue('date', newBillingDate);
    }
  }, [billingCycle, setValue]);

  let planData: any;
  let isSuccessPlan: any;
  const productName = getCRM?.data?.find(
    (product: ProductCRMI) => product?._id === productId,
  )?.name;

  const queryParameters = {
    ...(organizationId && { organizationId: organizationId?._id }),
    planTypeId: planTypeId,
    productId:
      selectProductSuite === productSuiteName?.crm ? undefined : productId,
    name:
      selectProductSuite === productSuiteName?.crm ? productName : undefined,
  };

  if (isEditModal) {
    delete queryParameters.organizationId;
  }

  if (selectProductSuite != productSuiteName?.crm) {
    const { data, isSuccess } = useGetPlanIdQuery<any>(
      { params: queryParameters },
      { skip: isNullOrEmpty(planTypeId) },
    );

    planData = data;
    isSuccessPlan = isSuccess;
  }

  let ExistingplanData: any;
  let ExistingisSuccessPlan: boolean = false;

  if (selectProductSuite === productSuiteName?.crm) {
    const { data, isSuccess } = useGetExistingCrmQuery<any>(
      { params: queryParameters },
      { skip: isNullOrEmpty(planTypeId) },
    );

    ExistingplanData = data;
    ExistingisSuccessPlan = isSuccess;
  }

  if (planData?.data?.plans) {
    setValue(
      'planPrice',
      isSuccessPlan ? planData?.data?.plans?.planPrice : '',
    );
    setValue(
      'defaultUser',
      isSuccessPlan ? planData?.data?.plans?.defaultUsers : '',
    );
    setValue(
      'defaultStorage',
      isSuccessPlan ? planData?.data?.plans?.defaultStorage : '',
    );
  }

  if (ExistingplanData?.data?.plans) {
    setValue(
      'planPrice',
      ExistingisSuccessPlan ? ExistingplanData?.data?.plans?.planPrice : '',
    );
    setValue(
      'defaultUser',
      ExistingisSuccessPlan ? ExistingplanData?.data?.plans?.defaultUsers : '',
    );
    setValue(
      'defaultStorage',
      ExistingisSuccessPlan
        ? ExistingplanData?.data?.plans?.defaultStorage
        : '',
    );
  }

  useEffect(() => {
    if (
      planData?.data?.plans?.additionalPerUserPrice > 0 ||
      ExistingplanData?.data?.plans?.additionalPerUserPrice > 0
    ) {
      setIsUserPrice(false);
    } else {
      setIsUserPrice(true);
    }
    if (
      planData?.data?.plans?.additionalStoragePrice > 0 ||
      ExistingplanData?.data?.plans?.additionalStoragePrice > 0
    ) {
      setIsStoragePrice(false);
    } else {
      setIsStoragePrice(true);
    }
  }, [planData?.data?.plans, ExistingplanData?.data?.plans]);

  useEffect(() => {
    if (
      selectProductSuite === 'CRM' ||
      isNullOrEmpty(ExistingplanData?.data?.plans) ||
      isNullOrEmpty(planData?.data?.plans)
    ) {
      setValue('planPrice', '');
      setValue('defaultUser', '');
      setValue('defaultStorage', '');
      setValue('planTypeId', '');
    }
  }, [selectProductSuite, ExistingplanData, planData]);

  useEffect(() => {
    if (isEditModal) {
      reset(rowApiValues);
    }
  }, []);

  const { data: planTypeData } = useGetPlanTypeQuery<any>({
    refetchOnMountOrArgChange: true,
  });

  const onSubmit = async (values: SubmitValuesI) => {
    const matchedPlan = planTypeData?.data?.find(
      (item: any) => item._id === values?.planType,
    );

    const assignPlanPayload = {
      organizationId: values?.clientName?._id,
      planId:
        selectProductSuite === 'CRM'
          ? ExistingplanData?.data?.plans?._id
          : planData?.data?.plans?._id,
      additionalUsers: parseInt(values?.additionalUser) || 0,
      additionalStorage: parseInt(values?.additionalStorage) || 0,
      planDiscount: parseInt(values?.discount) || 0,
      billingCycle: values?.billingCycle,
      billingDate: dayjs().format('YYYY-MM-DD'),
      isCRM: selectProductSuite === productSuiteName?.crm ? true : false,
      ...(isEditModal && {
        downgradePlan:
          rowApiValues?.planTypeSequenceOrder > matchedPlan?.sequenceOrder
            ? true
            : false,
      }),
    };

    // if (isEditModal) {
    //   delete assignPlanPayload?.organizationId;
    // }

    try {
      isEditModal
        ? await updateAssignPlan({
            body: assignPlanPayload,
            organizationPlanId: isGetRowValues?.cell?.row?.original?._id,
          }).unwrap()
        : await addAssignPlan({ body: assignPlanPayload }).unwrap();

      successSnackbar(
        `plan ${isEditModal ? 'assign updated' : 'assign'} Successfully`,
      );

      reset();
      onClose(false);
      setIsGetRowValues([]);
      setIsChecked(false);
    } catch (error: any) {
      if (
        error?.data?.message ===
        SUBSCRIPTION_AND_INVOICES_ERROR_MESSAGES?.PLAN_ALREADY_ASSIGNED
      ) {
        errorSnackbar(
          SUBSCRIPTION_AND_INVOICES_ERROR_MESSAGES?.PLAN_ALREADY_ASSIGNED,
        );
      } else {
        errorSnackbar(`${error?.data?.message}`);
      }
    }
  };

  useEffect(() => {
    if (isNullOrEmpty(planData?.data?.plans) && isSuccessPlan) {
      errorSnackbar(
        `Please create plan agaist respective selected product and product type`,
      );
      setIsExistingPlan(true);
    } else if (
      !isNullOrEmpty(planData?.data?.organizationAssignPlan) &&
      isSuccessPlan
    ) {
      errorSnackbar(
        `Plan agaist selected Client Name & Organisation already created`,
      );
      setIsExistingPlan(true);
    } else {
      setIsExistingPlan(false);
    }
  }, [planData, isSuccessPlan]);

  useEffect(() => {
    if (isNullOrEmpty(ExistingplanData?.data?.plans) && ExistingisSuccessPlan) {
      errorSnackbar(
        `Please create plan agaist respective selected product and product type`,
      );
      setIsExistingPlan(true);
    } else if (
      !isNullOrEmpty(ExistingplanData?.data?.organizationAssignPlan) &&
      ExistingisSuccessPlan
    ) {
      errorSnackbar(
        `Plan agaist selected Client Name & Organisation already created`,
      );
      setIsExistingPlan(true);
    } else {
      setIsExistingPlan(false);
    }
  }, [ExistingplanData, ExistingisSuccessPlan]);

  useEffect(() => {
    if (isGetRowValues?.cell?.row?.original?.planProducts?.length > 1) {
      setSelectProductSuite('CRM');
    }
  }, [isEditModal]);

  return {
    selectProductSuite,
    setSelectProductSuite,
    methods,
    handleSubmit,
    onSubmit,
    reset,
    crmOptions,
    isExistingPlan,
    isStoragePrice,
    isUserPrice,
    isLoading,
    isLoadingUpdate,
  };
};

export default useEditForm;

const calculateNewBillingDate = (
  billingCycle: BillingCycleEnum,
  billingDate: Date,
) => {
  const newValidTillDate = new Date(billingDate);

  const updatedBillingDate: any = {
    [BillingCycleEnum.HALF_MONTH]: () =>
      // newValidTillDate.setDate(newValidTillDate.getDate() + 15), //FOR LIVE: 15 Days Substription
      newValidTillDate.setDate(newValidTillDate.getDate() + 1), // FOR TESTING: 1 DAYS as a Half Month Subscription
    [BillingCycleEnum.MONTHLY]: () =>
      newValidTillDate.setMonth(newValidTillDate.getMonth() + 1),
    [BillingCycleEnum.QUARTERLY]: () =>
      newValidTillDate.setMonth(newValidTillDate.getMonth() + 3),
    [BillingCycleEnum.HALF_YEARLY]: () =>
      newValidTillDate.setMonth(newValidTillDate.getMonth() + 6),
    [BillingCycleEnum.YEARLY]: () =>
      newValidTillDate.setFullYear(newValidTillDate.getFullYear() + 1),

    //Default: 15 Days Substription
    default: () => newValidTillDate.setDate(newValidTillDate.getDate() + 15),
  };

  //Execute
  (updatedBillingDate[billingCycle] || updatedBillingDate.default)();

  return newValidTillDate;
};
