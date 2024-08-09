import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { defaultValues, emailTemplateSchema } from '../EmailTemplate.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddMeetingTemplateMutation } from '@/services/commonFeatures/meetings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { AIR_SERVICES, SOCIAL_COMPONENTS } from '@/constants';

export const useCreateEmail = () => {
  const router = useRouter();
  const moduleId = router?.query?.ticketId;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState('laptop');

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(emailTemplateSchema),
  });
  const { handleSubmit, watch } = methods;
  const [emailTrigger, emailProcess] = useAddMeetingTemplateMutation();

  const onSubmit = async (data: any) => {
    const body = {
      paragraph: data?.emailTemplate,
      meetingId: router?.query?.meetingId,
    };
    try {
      await emailTrigger(body)?.unwrap();
      successSnackbar('Email send successfully');
      router?.push({
        pathname: moduleId
          ? AIR_SERVICES?.TICKETS_LIST
          : SOCIAL_COMPONENTS?.MEETINGS,
        query: { type: 'allMeetings', ...(moduleId && { ticketId: moduleId }) },
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const editorData = watch('emailTemplate');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return {
    openDialog,
    setOpenDialog,
    value,
    handleChange,
    router,
    theme,
    methods,
    onSubmit,
    handleSubmit,
    editorData,
    emailProcess,
  };
};
