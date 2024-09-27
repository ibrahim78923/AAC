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
  useSendServicesDashboardRecurringViaEmailMutation,
  useSendServicesDashboardViaEmailOnceMutation,
} from '@/services/airServices/dashboard';

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
  ] = useSendServicesDashboardRecurringViaEmailMutation();

  const [
    sendServiceDashboardViaEmailOnceTrigger,
    sendServiceDashboardViaEmailOnceStatus,
  ] = useSendServicesDashboardViaEmailOnceMutation();

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
      await sendServiceDashboardViaEmailTrigger(apiDataParameter)?.unwrap();
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
      await sendServiceDashboardViaEmailOnceTrigger(apiDataParameter)?.unwrap();
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
    sendServiceDashboardViaEmailStatus,
    closeDrawer,
    handleSubmit,
    submitEmail,
    sendServiceDashboardViaEmailOnceStatus,
  };
};
