import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  EMAIL_SEND_TYPE,
  createEmailThisDashboardDefaultValues,
  createEmailThisDashboardValidationSchema,
  sendDashboardViaEmailFormFieldsDynamic,
} from './EmailThisDashboard.data';
import {
  useSendServiceDashboardViaEmailMutation,
  useSendServiceDashboardViaEmailOnceMutation,
} from '@/services/airServices/dashboard';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { useEffect } from 'react';

export const useEmailThisDashboard = (props: any) => {
  const { setIsDrawerOpen } = props;
  const methods: any = useForm({
    resolver: yupResolver(createEmailThisDashboardValidationSchema),
    defaultValues: createEmailThisDashboardDefaultValues,
  });

  const { handleSubmit, control, reset, clearErrors } = methods;

  const [
    sendServiceDashboardViaEmailTrigger,
    sendServiceDashboardViaEmailStatus,
  ] = useSendServiceDashboardViaEmailMutation();

  const [
    sendServiceDashboardViaEmailOnceTrigger,
    sendServiceDashboardViaEmailOnceStatus,
  ] = useSendServiceDashboardViaEmailOnceMutation();

  const isRecurringWatch = useWatch({
    control,
    name: 'isRecurring',
    defaultValue: '',
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
      await sendServiceDashboardViaEmailTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Email sent successfully');
      closeDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const sendEmailOnce = async (formData: any) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', formData?.email);
    emailFormData?.append('subject', formData?.emailSubject);
    !!formData?.message && emailFormData?.append('html', formData?.message);
    formData?.attachments !== null &&
      emailFormData?.append('attachments', formData?.attachments);

    const apiDataParameter = {
      body: emailFormData,
    };

    try {
      await sendServiceDashboardViaEmailOnceTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Email sent successfully');
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
    sendServiceDashboardViaEmailStatus,
    closeDrawer,
    handleSubmit,
    submitEmail,
    sendServiceDashboardViaEmailOnceStatus,
  };
};
