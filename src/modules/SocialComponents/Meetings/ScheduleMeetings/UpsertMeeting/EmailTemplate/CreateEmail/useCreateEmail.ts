import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { defaultValues, emailTemplateSchema } from '../EmailTemplate.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAddMeetingTemplateMutation,
  useGetByIdMeetingsEmailTemplatesQuery,
  useUpdateMeetingTemplatesMutation,
} from '@/services/commonFeatures/meetings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { AIR_SERVICES, SOCIAL_COMPONENTS } from '@/constants';

export const useCreateEmail = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState('laptop');
  const templateId = router?.query?.id;
  const templateType = router?.query?.type;
  const params = {
    id: templateId,
  };
  const { data, isFetching, isLoading, isError, refetch } =
    useGetByIdMeetingsEmailTemplatesQuery(params, {
      refetchOnMountOrArgChange: true,
      skip: !!!templateId,
    });

  const methods = useForm({
    defaultValues: defaultValues(data),
    resolver: yupResolver(emailTemplateSchema),
  });
  const { handleSubmit, watch, reset } = methods;
  useEffect(() => {
    reset(defaultValues(data));
  }, [data]);
  const [updateEmailTrigger, updateEmailProcess] =
    useUpdateMeetingTemplatesMutation();
  const [emailTrigger, emailProcess] = useAddMeetingTemplateMutation();

  const onSubmit = async (data: any) => {
    const body = {
      paragraph: data?.emailTemplate,
      meetingId: router?.query?.meetingId,
    };

    try {
      if (templateId) {
        await updateEmailTrigger({ ...body, id: templateId })?.unwrap();
      } else {
        await emailTrigger(body)?.unwrap();
      }
      successSnackbar('Email sent successfully');
      router?.push({
        pathname: ticketId
          ? AIR_SERVICES?.TICKETS_LIST
          : SOCIAL_COMPONENTS?.MEETINGS,
        query: {
          ...(ticketId ? { ticketId: ticketId } : { type: 'allMeetings' }),
        },
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
    isFetching,
    isLoading,
    isError,
    refetch,
    templateType,
    updateEmailProcess,
  };
};
