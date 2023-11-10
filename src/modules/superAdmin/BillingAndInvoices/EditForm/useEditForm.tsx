import { useState } from 'react';
import { defaultValues, validationSchema } from './EditForm.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { usePostBilingInvoicesMutation } from '@/services/superAdmin/billing-invoices';

const useEditForm = (isEditModal: any, isGetRowValues: any, onClose: any) => {
  const [selectProductSuite, setSelectProductSuite] = useState('product');

  const [addAssignPlan] = usePostBilingInvoicesMutation();

  const rowApiValues = {
    clientName: 'John',
    product: 'airSales',
    planType: 'Growth',
    additionalUser: isGetRowValues?.cell?.row?.original?.additionalUsers,
    planPrice: '45',
    defaultUser: '4',
    defaultUserTwo: '45',
    additionalStorage: isGetRowValues?.cell?.row?.original?.additionalStorage,
    discount: isGetRowValues?.cell?.row?.original?.planDiscount,
    billingCycle: `paid${
      isGetRowValues?.cell?.row?.original?.billingCycle
        .toLowerCase()
        .charAt(0)
        .toUpperCase() +
      isGetRowValues?.cell?.row?.original?.billingCycle?.toLowerCase()?.slice(1)
    }`,
    // billingCycle: 'paidMonthly',
    date: new Date(),
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues: defaultValues,
  });

  const apiMethods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: rowApiValues,
  });

  const { handleSubmit, reset } = isEditModal ? apiMethods : methods;

  const onSubmit = async (values: any) => {
    const originalDate = values?.date;
    const date = new Date(originalDate);
    const year = date?.getUTCFullYear();
    const month = (date?.getUTCMonth() + 1)?.toString()?.padStart(2, '0');
    const day = date?.getUTCDate()?.toString()?.padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const assignPlanPayload = {
      organizationId: values?.clientName,
      planId: '652677e726623bafa178e6a1',
      additionalUsers: parseInt(values?.additionalUser),
      additionalStorage: parseInt(values?.additionalStorage),
      planDiscount: parseInt(values?.discount),
      billingCycle: values?.billingCycle,
      billingDate: formattedDate,
    };

    try {
      await addAssignPlan({ body: assignPlanPayload }).unwrap();
      enqueueSnackbar('plan added Successfully', {
        variant: 'success',
      });
      reset();
      onClose(false);
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
    apiMethods,
    handleSubmit,
    onSubmit,
  };
};

export default useEditForm;
