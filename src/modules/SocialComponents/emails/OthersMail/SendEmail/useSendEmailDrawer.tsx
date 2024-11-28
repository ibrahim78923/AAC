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
  usePostDraftOtherEmailMutation,
  usePostReplyOtherEmailMutation,
  usePostScheduleOtherEmailMutation,
  usePostSendOtherEmailMutation,
} from '@/services/commonFeatures/email/others';
import { useAppSelector } from '@/redux/store';
import { CREATE_EMAIL_TYPES } from '@/constants';
import { useEffect, useState } from 'react';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useSendEmailDrawer = ({ setOpenDrawer, drawerType }: any) => {
  const theme = useTheme();
  const methodsDealsTasks: any = useForm({
    resolver: yupResolver(emailValidationsSchema),
    defaultValues: emailDefaultValues,
  });

  const [autocompleteValues, setAutocompleteValues] = useState<string[]>([]);

  const [isLoadingProcessDraft, setIsLoadingProcessDraft] = useState(false);
  const [isProcessDraft, setIsProcessDraft] = useState(false);

  const { handleSubmit, watch, reset, setValue } = methodsDealsTasks;
  const watchEmailsForm = watch(['ccChecked', 'bccChecked', 'to', 'sentDate']);

  useEffect(() => {
    setValue('to', autocompleteValues);
  }, [autocompleteValues]);

  const [postSendOtherEmail, { isLoading: loadingOtherSend }] =
    usePostSendOtherEmailMutation();
  const [postScheduleOtherEmail, { isLoading: loadingOtherScheduleSend }] =
    usePostScheduleOtherEmailMutation();
  const [postReplyOtherEmail, { isLoading: loadingOtherReply }] =
    usePostReplyOtherEmailMutation();
  const [postDraftOtherEmail] = usePostDraftOtherEmailMutation();

  const currentEmailAssets = useAppSelector(
    (state: any) => state?.email?.currentEmailAssets,
  );

  const handleOnClose = () => {
    if (drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL) {
      setIsProcessDraft(true);
    } else {
      reset();
      setOpenDrawer(false);
      setAutocompleteValues([]);
    }
  };

  // trigger if process draft: true
  useEffect(() => {
    if (isProcessDraft) {
      handleSubmit(onSubmit)();
    }
  }, [isProcessDraft]);

  const [isSendLater, setIsSendLater] = useState(false);

  const [sendLaterDate, setSendLaterDate] = useState<any>();

  const isToExists = watchEmailsForm[2];

  const dateObject = watchEmailsForm[3] && new Date(watchEmailsForm[3]);
  const isoString = dateObject?.toISOString();

  const handelSendLaterAction = () => {
    if (isSendLater) {
      setIsSendLater(false);
      reset({
        sentDate: null,
      });
    } else {
      setIsSendLater(true);
    }
  };

  useEffect(() => {
    if (isoString) {
      setSendLaterDate(isoString);
    }
  }, [isoString]);

  const postEmail = isSendLater ? postScheduleOtherEmail : postSendOtherEmail;

  const onSubmit = async (values: any) => {
    if (isProcessDraft) {
      if (isToExists?.length > 0) {
        setIsLoadingProcessDraft(true);
        //draft process
        const formDataSend = new FormData();
        formDataSend.append('to', values?.to);
        formDataSend.append('subject', values?.subject);
        formDataSend.append('content', values?.description);
        if (values?.cc && values?.cc?.trim() !== '') {
          formDataSend.append('cc', values?.cc);
        }
        if (values?.bcc && values?.bcc?.trim() !== '') {
          formDataSend.append('bcc', values?.bcc);
        }
        try {
          await postDraftOtherEmail({
            body: formDataSend,
          })?.unwrap();
          successSnackbar('Draft saved successfully');
          setIsProcessDraft(false);
          setIsLoadingProcessDraft(false);
          reset();
          setOpenDrawer(false);
          setAutocompleteValues([]);
        } catch (error: any) {
          errorSnackbar('Something went wrong while saving draft !');
          setIsProcessDraft(false);
          setIsLoadingProcessDraft(false);
          reset();
          setOpenDrawer(false);
        }
      } else {
        setIsProcessDraft(false);
        setOpenDrawer(false);
        reset();
      }
    } else {
      if (drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL) {
        const formDataSend = new FormData();
        formDataSend.append('to', values?.to);
        formDataSend.append('subject', values?.subject);
        formDataSend.append('content', values?.description);
        if (values?.cc && values?.cc?.trim() !== '') {
          formDataSend.append('cc', values?.cc);
        }
        if (values?.bcc && values?.bcc?.trim() !== '') {
          formDataSend.append('bcc', values?.bcc);
        }
        if (sendLaterDate) {
          formDataSend.append('sendAt', sendLaterDate);
        }
        try {
          await postEmail({
            body: formDataSend,
          })?.unwrap();
          successSnackbar('Email send successfully');
          setOpenDrawer(false);
          reset();
          reset({
            sentDate: null,
          });
          setIsSendLater(false);
          setSendLaterDate(null);
          setAutocompleteValues([]);
        } catch (error: any) {
          errorSnackbar('Something went wrong !');
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
          successSnackbar(
            drawerType === CREATE_EMAIL_TYPES?.REPLY
              ? 'Email reply send successfully'
              : 'Reply all send successfully',
          );
          setOpenDrawer(false);
          reset();
          setAutocompleteValues([]);
        } catch (error: any) {
          errorSnackbar('Something went wrong !');
        }
      }
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
    setValue,
    loadingOtherSend,
    loadingOtherScheduleSend,
    loadingOtherReply,
    isLoadingProcessDraft,
    handleOnClose,
    sendLaterDate,
    setIsSendLater,
    isSendLater,
    handelSendLaterAction,
    setAutocompleteValues,
    autocompleteValues,
  };
};
export default useSendEmailDrawer;
