import { useState } from 'react';
import { defaultValues, validationSchema } from './EditForm.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  useGetPlanIdQuery,
  usePatchBilingInvoicesMutation,
  usePostBilingInvoicesMutation,
} from '@/services/superAdmin/billing-invoices';

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
    product: isGetRowValues?.cell?.row?.original?.planProducts[0]?._id,
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

  const { handleSubmit, reset, watch, setValue } = methods;

  const productId = watch('product');
  const planTypeId = watch('planType');

  const { data: planData, isSuccess } = useGetPlanIdQuery<any>({
    proId: productId,
    planTypeId: planTypeId,
  });

  if (planData) {
    setValue('planPrice', isSuccess ? planData?.data?.planPrice : '');
    setValue('defaultUser', isSuccess ? planData?.data?.defaultUsers : '');
    setValue('defaultUserTwo', isSuccess ? planData?.data?.defaultUsers : '');
  }

  const onSubmit = async (values: any) => {
    const originalDate = values?.date;
    const date = new Date(originalDate);
    const year = date?.getUTCFullYear();
    const month = (date?.getUTCMonth() + 1)?.toString()?.padStart(2, '0');
    const day = date?.getUTCDate()?.toString()?.padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const assignPlanPayload = {
      organizationId: values?.clientName,
      planId: planData?.data?._id,
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

  return {
    selectProductSuite,
    setSelectProductSuite,
    methods,
    handleSubmit,
    onSubmit,
    reset,
  };
};

export default useEditForm;
