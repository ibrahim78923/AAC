import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  EMAIL_SEND_TYPE,
  createEmailThisDashboardDefaultValues,
  createEmailThisDashboardValidationSchema,
  sendDashboardViaEmailFormFieldsDynamic,
} from './EmailThisDashboard.data';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { useEffect } from 'react';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import {
  useSendSalesDashboardRecurringViaEmailMutation,
  useSendSalesDashboardViaEmailOnceMutation,
} from '@/services/airSales/dashboard';

export const useEmailThisDashboard = (setIsDrawerOpen: any) => {
  const methods: any = useForm({
    resolver: yupResolver(createEmailThisDashboardValidationSchema),
    defaultValues: createEmailThisDashboardDefaultValues,
  });

  const { handleSubmit, control, reset, clearErrors } = methods;

  const [sendSalesDashboardViaEmailTrigger, sendSalesDashboardViaEmailStatus] =
    useSendSalesDashboardRecurringViaEmailMutation();

  const [
    sendSalesDashboardViaEmailOnceTrigger,
    sendSalesDashboardViaEmailOnceStatus,
  ] = useSendSalesDashboardViaEmailOnceMutation();

  const isRecurringWatch = useWatch({
    control,
    name: 'isRecurring',
    defaultValue: EMAIL_SEND_TYPE?.ONCE,
  });

  const watchScheduleOption = useWatch({
    control,
    name: 'schedule',
    defaultValue: null,
  });

  useEffect(() => {
    clearErrors?.('');
  }, [isRecurringWatch]);

  const submitEmail = async (formData: any) => {
    const filteredFormData = filteredEmptyValues(formData);

    if (formData?.isRecurring === EMAIL_SEND_TYPE?.ONCE) {
      sendEmailOnce?.(filteredFormData);
      return;
    }

    const apiDataParameter = {
      queryParams: filteredFormData,
    };

    try {
      await sendSalesDashboardViaEmailTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Email sent successfully');
      closeDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const sendEmailOnce = async (formData: any) => {
    const emailFormData = new FormData();
    const recipients = formData?.email?.map(
      (user: AutocompleteAsyncOptionsI) => user?.email,
    );
    emailFormData?.append('recipients', recipients);
    emailFormData?.append('subject', formData?.emailSubject);
    !!formData?.message && emailFormData?.append('html', formData?.message);
    formData?.attachments !== null &&
      emailFormData?.append('attachments', formData?.attachments);

    const apiDataParameter = {
      body: emailFormData,
    };

    try {
      await sendSalesDashboardViaEmailOnceTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Dashboard share successfully via Email');
      closeDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const sendDashboardViaEmailFormFields =
    sendDashboardViaEmailFormFieldsDynamic?.(
      isRecurringWatch,
      watchScheduleOption,
    );

  const closeDrawer = () => {
    reset();
    setIsDrawerOpen?.(false);
  };

  return {
    methods,
    sendDashboardViaEmailFormFields,
    sendSalesDashboardViaEmailStatus,
    closeDrawer,
    handleSubmit,
    submitEmail,
    sendSalesDashboardViaEmailOnceStatus,
  };
};
