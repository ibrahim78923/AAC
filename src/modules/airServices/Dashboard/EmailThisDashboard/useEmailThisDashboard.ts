import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createEmailThisDashboardDefaultValues,
  createEmailThisDashboardValidationSchema,
  EMAIL_SEND_TYPE,
  sendDashboardViaEmailFormFieldsDynamic,
} from './EmailThisDashboard.data';
import { usePostEmailDashboardMutation } from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useEmailThisDashboard = (props: any) => {
  const { setIsDrawerOpen } = props;
  const methods: any = useForm({
    resolver: yupResolver(createEmailThisDashboardValidationSchema),
    defaultValues: createEmailThisDashboardDefaultValues,
  });

  const { handleSubmit, control, reset } = methods;

  const [postEmailTrigger, postEmailProgress] = usePostEmailDashboardMutation();

  const emailSendTypeWatch = useWatch({
    control,
    name: 'emailSendType',
    defaultValue: '',
  });

  const submitEmail = async (data: any) => {
    const formData = new FormData();
    formData?.append('isRecurring', data?.emailCondition);
    formData?.append('email', data?.internalRecipients);
    formData?.append('subject', data?.emailSubject);
    formData?.append('message', data?.message);
    formData?.append('fileType', data?.fileType);
    data?.emailSendType === EMAIL_SEND_TYPE?.RECURRING &&
      formData?.append('time', data?.time);
    data?.emailSendType === EMAIL_SEND_TYPE?.RECURRING &&
      formData?.append('schedule', data?.schedule);

    const postEmailParameter = {
      body: formData,
    };

    try {
      await postEmailTrigger(postEmailParameter)?.unwrap();
      successSnackbar('Email sent successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const sendDashboardViaEmailFormFields =
    sendDashboardViaEmailFormFieldsDynamic?.(emailSendTypeWatch);

  const closeDrawer = () => {
    reset();
    setIsDrawerOpen?.(false);
  };

  return {
    methods,
    sendDashboardViaEmailFormFields,
    postEmailProgress,
    handleSubmit,
    submitEmail,
    closeDrawer,
  };
};
