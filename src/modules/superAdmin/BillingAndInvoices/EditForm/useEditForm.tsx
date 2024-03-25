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

const useEditForm = (
  isEditModal: any,
  isGetRowValues: any,
  onClose: any,
  setIsGetRowValues: any,
  setIsChecked: any,
) => {
  const [selectProductSuite, setSelectProductSuite] = useState('product');

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
    date: new Date(),
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
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

  let planData: any;
  let isSuccessPlan;
  let isErrorPlan;

  if (selectProductSuite != 'CRM') {
    const { data, isSuccess, isError } = useGetPlanIdQuery<any>(
      {
        proId: productId,
        planTypeId: planTypeId,
      },
      { skip: isNullOrEmpty(planTypeId) },
    );

    planData = data;
    isSuccessPlan = isSuccess;
    isErrorPlan = isError;
  }

  let ExistingplanData: any;
  let ExistingisSuccessPlan;
  let ExistingisErrorPlan;

  if (selectProductSuite === 'CRM') {
    const { data, isSuccess, isError } = useGetExistingCrmQuery<any>(
      {
        crmName: getCRM?.data?.find(
          (product: any) => product?._id === productId,
        )?.name,
        planTypeId: planTypeId,
      },
      { skip: isNullOrEmpty(planTypeId) },
    );

    ExistingplanData = data;
    ExistingisSuccessPlan = isSuccess;
    ExistingisErrorPlan = isError;
  }

  if (planData) {
    setValue('planPrice', isSuccessPlan ? planData?.data?.planPrice : '');
    setValue('defaultUser', isSuccessPlan ? planData?.data?.defaultUsers : '');
    setValue(
      'defaultUserTwo',
      isSuccessPlan ? planData?.data?.defaultUsers : '',
    );
  }

  if (ExistingplanData) {
    setValue(
      'planPrice',
      ExistingisSuccessPlan ? ExistingplanData?.data?.planPrice : '',
    );
    setValue(
      'defaultUser',
      ExistingisSuccessPlan ? ExistingplanData?.data?.defaultUsers : '',
    );
    setValue(
      'defaultUserTwo',
      ExistingisSuccessPlan ? ExistingplanData?.data?.defaultUsers : '',
    );
  }

  useEffect(() => {
    if (selectProductSuite === 'CRM') {
      setValue('planPrice', '');
      setValue('defaultUser', '');
      setValue('defaultUserTwo', '');
      setValue('planTypeId', '');
    }
  }, [selectProductSuite]);

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
          ? ExistingplanData?.data?._id
          : planData?.data?._id,
      additionalUsers: parseInt(values?.additionalUser),
      additionalStorage: parseInt(values?.additionalStorage),
      planDiscount: parseInt(values?.discount),
      billingCycle: values?.billingCycle,
      billingDate: formattedDate,
    };

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

  // if (isSuccessPlan || ExistingisSuccessPlan) {
  //   enqueueSnackbar(`Success fetch plan data`, {
  //     variant: 'success',
  //   });
  // } else {  }
  if (isErrorPlan || ExistingisErrorPlan) {
    enqueueSnackbar(
      `Please create plan agaist respective selected product and product type`,
      {
        variant: 'error',
      },
    );
  }

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
  };
};

export default useEditForm;
