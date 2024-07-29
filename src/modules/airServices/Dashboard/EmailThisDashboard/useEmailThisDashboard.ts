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

export const useEmailThisDashboard = (props: any) => {
  const { setIsDrawerOpen } = props;
  const methods: any = useForm({
    resolver: yupResolver(createEmailThisDashboardValidationSchema),
    defaultValues: createEmailThisDashboardDefaultValues,
  });

  const { handleSubmit, control, reset } = methods;

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
    emailFormData?.append('html', formData?.message);
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
    sendDashboardViaEmailFormFieldsDynamic?.(isRecurringWatch);

  const closeDrawer = () => {
    reset();
    setIsDrawerOpen?.(false);
  };

  return {
    methods,
    sendDashboardViaEmailFormFields,
    sendServiceDashboardViaEmailStatus,
    handleSubmit,
    submitEmail,
    closeDrawer,
    sendServiceDashboardViaEmailOnceStatus,
  };
};
