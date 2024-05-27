import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  constantData,
  createEmailThisDashboardDefaultValues,
  createEmailThisDashboardValidationSchema,
} from './EmailThisDashboard.data';
import { usePostEmailDashboardMutation } from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export function useEmailThisDashboard() {
  const methods: any = useForm({
    resolver: yupResolver(createEmailThisDashboardValidationSchema),
    defaultValues: createEmailThisDashboardDefaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;

  const [postEmailTrigger, postEmailProgress] = usePostEmailDashboardMutation();

  const submit = async (data: any) => {
    const formData = new FormData();
    formData?.append('isRecurring', data?.emailCondition);
    formData?.append('email', data?.internalRecipients);
    formData?.append('subject', data?.emailSubject);
    formData?.append('message', data?.message);
    formData?.append('fileType', data?.fileType);
    data?.emailCondition === constantData?.recurring &&
      formData?.append('time', data?.time);
    data?.emailCondition === constantData?.recurring &&
      formData?.append('schedule', data?.schedule);
    data?.emailCondition === constantData?.recurring &&
      formData?.append('weekDays', data?.scheduleDay);
    data?.emailCondition === constantData?.recurring &&
      formData?.append('monthDays', data?.scheduleDate);

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
  const theme = useTheme();
  const router = useRouter();

  const watchRecurringEmail = watch('emailCondition');

  return {
    theme,
    router,
    handleSubmit,
    methods,
    submit,
    watchRecurringEmail,
    watch,
    setValue,
    postEmailProgress,
  };
}
