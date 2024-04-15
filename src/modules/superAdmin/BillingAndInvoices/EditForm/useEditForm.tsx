import { useEffect, useState } from 'react';
import { defaultValues, validationSchema } from './EditForm.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  useGetExistingCrmQuery,
  useGetPlanIdQuery,
  usePatchBilingInvoicesMutation,
  usePostBilingInvoicesMutation,
} from '@/services/superAdmin/billing-invoices';
import { isNullOrEmpty } from '@/utils';
import { useGetCrmQuery } from '@/services/superAdmin/plan-mangement';
import { productSuiteName } from '@/constants';

const useEditForm = (
  isEditModal: any,
  isGetRowValues: any,
  onClose: any,
  setIsGetRowValues: any,
  setIsChecked: any,
) => {
  const [selectProductSuite, setSelectProductSuite] = useState('product');
  const [isExistingPlan, setIsExistingPlan] = useState(false);

  const [addAssignPlan] = usePostBilingInvoicesMutation();
  const [updateAssignPlan] = usePatchBilingInvoicesMutation();

  const rowApiValues = {
    clientName: isGetRowValues?.cell?.row?.original?.organizationId,
    product:
      isGetRowValues?.cell?.row?.original?.planProducts?.length > 1
        ? isGetRowValues?.cell?.row?.original?.plans?._id
        : isGetRowValues?.cell?.row?.original?.planProducts[0]?._id,
    planType: isGetRowValues?.cell?.row?.original?.plantypes?._id,
    additionalUser: isGetRowValues?.cell?.row?.original?.additionalUsers,
    planPrice: isGetRowValues?.cell?.row?.original?.plans?.planPrice,
    defaultUser: isGetRowValues?.cell?.row?.original?.plans?.defaultUsers,
    defaultUserTwo: isGetRowValues?.cell?.row?.original?.plans?.defaultUsers,
    additionalStorage: isGetRowValues?.cell?.row?.original?.additionalStorage,
    discount: isGetRowValues?.cell?.row?.original?.planDiscount,
    billingCycle: isGetRowValues?.cell?.row?.original?.billingCycle,
    date: new Date(isGetRowValues?.cell?.row?.original?.billingDate),
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    // defaultValues: defaultValues,
    defaultValues: async () => {
      // if action is view or update

      if (rowApiValues) {
        const {
          clientName,
          product,
          planType,
          additionalUser,
          planPrice,
          defaultUser,
          defaultUserTwo,
          additionalStorage,
          discount,
          billingCycle,
          date,
        } = rowApiValues;
        return {
          clientName,
          product,
          planType,
          additionalUser,
          planPrice,
          defaultUser,
          defaultUserTwo,
          additionalStorage,
          discount,
          billingCycle,
          date,
        };
      }
      return defaultValues;
    },
  });

  const { data: getCRM } = useGetCrmQuery({});

  const crmOptions = getCRM?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  const { handleSubmit, reset, watch, setValue } = methods;

  const productId = watch('product');
  const planTypeId = watch('planType');
  const organizationId = watch('clientName');
  const billingCycle = watch('billingCycle');

  if (billingCycle === 'MONTHLY' && !isEditModal) {
    const currentDate = new Date();
    currentDate?.setMonth(currentDate?.getMonth() + 1);
    setValue('date', currentDate);
  }

  let planData: any;
  let isSuccessPlan: any;
  const productName = getCRM?.data?.find(
    (product: any) => product?._id === productId,
  )?.name;

  const queryParameters = {
    ...(organizationId && { organizationId: organizationId }),
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
  let ExistingisSuccessPlan: boolean;

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
      'defaultUserTwo',
      isSuccessPlan ? planData?.data?.plans?.defaultUsers : '',
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
      'defaultUserTwo',
      ExistingisSuccessPlan ? ExistingplanData?.data?.plans?.defaultUsers : '',
    );
  }

  useEffect(() => {
    if (
      selectProductSuite === 'CRM' ||
      isNullOrEmpty(ExistingplanData?.data?.plans) ||
      isNullOrEmpty(planData?.data?.plans)
    ) {
      setValue('planPrice', '');
      setValue('defaultUser', '');
      setValue('defaultUserTwo', '');
      setValue('planTypeId', '');
    }
  }, [selectProductSuite, ExistingplanData, planData]);

  const onSubmit = async (values: any) => {
    const originalDate = values?.date;
    const date = new Date(originalDate);
    const year = date?.getUTCFullYear();
    const month = (date?.getUTCMonth() + 1)?.toString()?.padStart(2, '0');
    const day = date?.getUTCDate()?.toString()?.padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const assignPlanPayload = {
      organizationId: values?.clientName,
      planId:
        selectProductSuite === 'CRM'
          ? ExistingplanData?.data?.plans?._id
          : planData?.data?.plans?._id,
      additionalUsers: parseInt(values?.additionalUser),
      additionalStorage: parseInt(values?.additionalStorage),
      planDiscount: parseInt(values?.discount),
      billingCycle: values?.billingCycle,
      billingDate: formattedDate,
      isCRM: selectProductSuite === productSuiteName?.crm ? true : false,
    };

    if (isEditModal) {
      delete assignPlanPayload?.organizationId;
    }

    try {
      isEditModal
        ? await updateAssignPlan({
            body: assignPlanPayload,
            organizationPlanId: isGetRowValues?.cell?.row?.original?._id,
          }).unwrap()
        : await addAssignPlan({ body: assignPlanPayload }).unwrap();

      enqueueSnackbar(
        `plan ${isEditModal ? 'updated' : 'added'} Successfully`,
        {
          variant: 'success',
        },
      );

      reset();
      onClose(false);
      setIsGetRowValues([]);
      setIsChecked(false);
    } catch (error) {
      enqueueSnackbar('Some thing went wrong', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    if (isNullOrEmpty(planData?.data?.plans) && isSuccessPlan) {
      enqueueSnackbar(
        `Please create plan agaist respective selected product and product type`,
        {
          variant: 'error',
        },
      );
      setIsExistingPlan(true);
    } else if (
      !isNullOrEmpty(planData?.data?.organizationAssignPlan) &&
      isSuccessPlan
    ) {
      enqueueSnackbar(
        `Plan agaist selected Client Name & Organization already created`,
        {
          variant: 'error',
        },
      );
      setIsExistingPlan(true);
    } else {
      setIsExistingPlan(false);
    }
  }, [planData, isSuccessPlan]);

  useEffect(() => {
    if (isNullOrEmpty(ExistingplanData?.data?.plans) && ExistingisSuccessPlan) {
      enqueueSnackbar(
        `Please create plan agaist respective selected product and product type`,
        {
          variant: 'error',
        },
      );
      setIsExistingPlan(true);
    } else if (
      !isNullOrEmpty(ExistingplanData?.data?.organizationAssignPlan) &&
      ExistingisSuccessPlan
    ) {
      enqueueSnackbar(
        `Plan agaist selected Client Name & Organization already created`,
        {
          variant: 'error',
        },
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
  };
};

export default useEditForm;
