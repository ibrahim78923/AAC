import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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

export const apiKeys = [
  { id: 1, label: 'Host Name', value: '{{name}}' },
  { id: 2, label: 'Meeting Url', value: '{{meetingUrl}}' },
  { id: 3, label: 'Meeting Type', value: '{{type}}' },
  { id: 4, label: 'Start Time', value: '{{startTime}}' },
  { id: 5, label: 'End Time', value: '{{endTime}}' },
  { id: 6, label: 'Start Date', value: '{{startDate}}' },
  { id: 7, label: 'Meeting Agenda', value: '{{agenda}}' },
];

export const useCreateEmail = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;
  const quillRef = useRef<any>(null);
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
  const { handleSubmit, reset, getValues } = methods;
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

    const requiredKeys = apiKeys?.map((key) => key?.value);
    const hasAllRequiredKeys = requiredKeys?.every(
      (key) => body?.paragraph?.includes(key),
    );
    if (!hasAllRequiredKeys) {
      errorSnackbar(
        `Email template is missing required meeting tags 'Host Name', 'Meeting Url', etc.`,
      );
      return;
    }

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

  const editorData = getValues('emailTemplate');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleInsertText = (text: any) => {
    if (quillRef?.current && quillRef?.current?.getEditor) {
      const editor = quillRef?.current?.getEditor();
      const range = editor?.getSelection();
      if (range) {
        editor?.insertText(range?.index, text);
      }
    }
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
    quillRef,
    handleInsertText,
  };
};
