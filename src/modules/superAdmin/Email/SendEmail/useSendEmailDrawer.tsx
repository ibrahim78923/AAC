import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  emailDefaultValues,
  emailValidationsSchema,
  scheduleEmailDefaultValues,
  scheduleEmailValidationSchema,
} from './SendEmailDrawer.data';
import {
  usePostReplyOtherEmailMutation,
  usePostSendOtherEmailMutation,
} from '@/services/commonFeatures/email';
import { enqueueSnackbar } from 'notistack';
import { useAppSelector } from '@/redux/store';
import { CREATE_EMAIL_TYPES } from '@/constants';

const useSendEmailDrawer = ({ setOpenDrawer, drawerType }: any) => {
  const theme = useTheme();
  const methodsDealsTasks: any = useForm({
    resolver: yupResolver(emailValidationsSchema),
    defaultValues: emailDefaultValues,
  });

  const { handleSubmit, watch, reset } = methodsDealsTasks;
  const watchEmailsForm = watch(['ccChecked', 'bccChecked']);

  const [postSendOtherEmail, { isLoading: loadingOtherSend }] =
    usePostSendOtherEmailMutation();
  const [postReplyOtherEmail, { isLoading: loadingOtherReply }] =
    usePostReplyOtherEmailMutation();

  const currentEmailAssets = useAppSelector(
    (state: any) => state?.email?.currentEmailAssets,
  );

  const onSubmit = async (values: any) => {
    if (drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL) {
      const formDataSend = new FormData();
      formDataSend.append('to', values?.to);
      formDataSend.append('subject', values?.subject);
      formDataSend.append('content', values?.description);
      if (values?.cc && values?.cc?.trim() !== '') {
        formDataSend.append('cc', values.cc);
      }
      if (values?.bcc && values?.bcc?.trim() !== '') {
        formDataSend.append('bcc', values.bcc);
      }
      try {
        await postSendOtherEmail({
          body: formDataSend,
        })?.unwrap();
        enqueueSnackbar('Email send successfully', {
          variant: 'success',
        });
        setOpenDrawer(false);
        reset();
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    }
    if (
      drawerType === CREATE_EMAIL_TYPES?.REPLY ||
      drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL
    ) {
      const formDataReply = new FormData();
      formDataReply.append('id', currentEmailAssets?.id);
      formDataReply.append('threadId', currentEmailAssets?.threadId);
      formDataReply.append('content', values?.description);
      formDataReply.append('templateId', '6538bb480b3f9e9d83d4a2ce');
      formDataReply.append(
        'type',
        drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL ? 'reply-all' : 'reply',
      );
      formDataReply.append('attachments', '');

      try {
        await postReplyOtherEmail({
          body: formDataReply,
        })?.unwrap();
        enqueueSnackbar(
          drawerType === CREATE_EMAIL_TYPES?.REPLY
            ? 'Email reply send successfully'
            : 'Reply all send successfully',
          {
            variant: 'success',
          },
        );
        setOpenDrawer(false);
        reset();
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    }

    if (drawerType === CREATE_EMAIL_TYPES?.DRAFT) {
      alert('draft process');
    }
  };

  const methodsScheduleEmail = useForm({
    resolver: yupResolver(scheduleEmailValidationSchema),
    defaultValues: scheduleEmailDefaultValues,
  });

  const onSubmitEmail = () => {};
  const { handleSubmit: handleScheduleEmail } = methodsScheduleEmail;

  return {
    handleSubmit,
    onSubmit,
    methodsDealsTasks,
    watchEmailsForm,
    theme,
    handleScheduleEmail,
    methodsScheduleEmail,
    onSubmitEmail,
    reset,
    loadingOtherSend,
    loadingOtherReply,
  };
};
export default useSendEmailDrawer;
