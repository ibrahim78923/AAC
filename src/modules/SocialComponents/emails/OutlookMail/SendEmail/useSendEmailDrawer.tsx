import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  emailDefaultValues,
  emailValidationsSchema,
  scheduleEmailDefaultValues,
  scheduleEmailValidationSchema,
} from './SendEmailDrawer.data';
import { enqueueSnackbar } from 'notistack';
import { useAppSelector } from '@/redux/store';
import { CREATE_EMAIL_TYPES } from '@/constants';
import { useEffect, useState } from 'react';
import {
  useForwardEmailOutlookMutation,
  usePostDraftEmailOutlookMutation,
  usePostReplyEmailOutlookMutation,
  usePostScheduleEmailOutlookMutation,
  usePostSendEmailOutlookMutation,
} from '@/services/commonFeatures/email/outlook';

const useSendEmailDrawer = ({ setOpenDrawer, drawerType }: any) => {
  const theme = useTheme();

  const currentEmailAssets = useAppSelector(
    (state: any) => state?.outlook?.currentEmailAssets,
  );
  const [isSendLater, setIsSendLater] = useState(false);
  const methodsDealsTasks: any = useForm({
    resolver: yupResolver(emailValidationsSchema(drawerType, isSendLater)),
    defaultValues: emailDefaultValues,
  });

  const [autocompleteValues, setAutocompleteValues] = useState<string[]>([]);

  const [isLoadingProcessDraft, setIsLoadingProcessDraft] = useState(false);
  const [isProcessDraft, setIsProcessDraft] = useState(false);

  const [isToValid, setisToValid] = useState(false);

  const { handleSubmit, watch, reset, setValue } = methodsDealsTasks;
  const watchEmailsForm = watch(['ccChecked', 'bccChecked', 'to', 'sentDate']);

  useEffect(() => {
    setValue('to', autocompleteValues);
  }, [autocompleteValues]);

  useEffect(() => {
    if (drawerType === CREATE_EMAIL_TYPES?.FORWARD) {
      setValue('description', currentEmailAssets?.others?.body);
    } else {
      setValue('description', '');
    }
  }, [currentEmailAssets]);

  useEffect(() => {
    if (drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL) {
      setValue('description', '');
    }
  }, [drawerType]);

  const [postSendOtherEmail, { isLoading: loadingOtherSend }] =
    usePostSendEmailOutlookMutation();
  const [postScheduleOtherEmail, { isLoading: loadingOtherScheduleSend }] =
    usePostScheduleEmailOutlookMutation();
  const [postReplyOtherEmail, { isLoading: loadingOtherReply }] =
    usePostReplyEmailOutlookMutation();
  const [postDraftOtherEmail] = usePostDraftEmailOutlookMutation();

  const [postforwardOutlookEmail, { isLoading: isLoadingForward }] =
    useForwardEmailOutlookMutation();

  const isToExists = watchEmailsForm[2];

  const handleOnClose = () => {
    setisToValid(false);
    if (
      drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL ||
      drawerType === CREATE_EMAIL_TYPES?.REPLY
    ) {
      if (isToExists?.length > 0) {
        setIsProcessDraft(true);
      } else {
        reset();
        setOpenDrawer(false);
        setAutocompleteValues([]);
      }
    } else {
      reset();
      setOpenDrawer(false);
      setAutocompleteValues([]);
    }
  };

  useEffect(() => {
    if (isProcessDraft) {
      handleSubmit(onSubmit)();
    }
  }, [isProcessDraft]);

  const [sendLaterDate, setSendLaterDate] = useState<any>();

  const [toStateDep, setToStateDep] = useState(1);

  useEffect(() => {
    if (isToExists?.length === 0 || isToExists?.length === undefined) {
      null;
    } else {
      setisToValid(false);
    }
  }, [isToExists, toStateDep]);

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
    setToStateDep(toStateDep + 1);
    if (
      (drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL &&
        isToExists?.length === 0) ||
      isToExists?.length === undefined
    ) {
      setisToValid(true);
    } else {
      setisToValid(false);
      if (isProcessDraft) {
        if (isToExists?.length > 0) {
          setIsLoadingProcessDraft(true);
          //draft process
          const formDataSend = new FormData();
          formDataSend.append('to', values?.to);
          formDataSend.append('subject', values?.subject);
          formDataSend.append(
            'content',
            values?.description?.length ? values?.description : ' ',
          );

          if (values?.cc && values?.cc?.trim() !== '') {
            formDataSend.append('cc', values?.cc);
          }
          if (values?.bcc && values?.bcc?.trim() !== '') {
            formDataSend.append('bcc', values?.bcc);
          }
          if (values?.attachments) {
            formDataSend.append('attachment', values?.attachments);
          }
          try {
            await postDraftOtherEmail({
              body: formDataSend,
            })?.unwrap();
            enqueueSnackbar('Draft saved successfully', {
              variant: 'success',
            });
            setIsProcessDraft(false);
            setIsLoadingProcessDraft(false);
            reset();
            setOpenDrawer(false);
            setAutocompleteValues([]);
          } catch (error: any) {
            enqueueSnackbar('Something went wrong while saving draft !', {
              variant: 'error',
            });
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
          formDataSend.append('content', values?.description || '<p></p>');

          if (!isSendLater) {
            formDataSend.append('attachments', values?.attachments);
          }

          if (values?.cc && values?.cc?.trim() !== '') {
            formDataSend.append('cc', values?.cc);
          }
          if (values?.bcc && values?.bcc?.trim() !== '') {
            formDataSend.append('bcc', values?.bcc);
          }
          if (sendLaterDate) {
            formDataSend.append('sentOn', sendLaterDate);
          }
          try {
            await postEmail({
              body: formDataSend,
            })?.unwrap();
            enqueueSnackbar(
              sendLaterDate
                ? 'Email scheduled successfully'
                : 'Email send successfully',
              {
                variant: 'success',
              },
            );
            setOpenDrawer(false);
            reset();
            reset({
              sentDate: null,
            });
            setIsSendLater(false);
            setSendLaterDate(null);
            setAutocompleteValues([]);
          } catch (error: any) {
            enqueueSnackbar('Something went wrong !', { variant: 'error' });
          }
        }
        if (
          drawerType === CREATE_EMAIL_TYPES?.REPLY ||
          drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL
        ) {
          const formDataReply = new FormData();
          formDataReply.append('messageId', currentEmailAssets?.messageId);
          formDataReply.append('replyText', values?.description);
          formDataReply.append('type', 'reply');
          formDataReply.append('attachments', values?.attachments);
          try {
            await postReplyOtherEmail({
              messageId: currentEmailAssets?.messageId,
              type:
                drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL
                  ? 'reply-all'
                  : 'reply',
              replyText: values?.description,
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
            setAutocompleteValues([]);
          } catch (error: any) {
            enqueueSnackbar('Something went wrong !', { variant: 'error' });
          }
        }
        if (drawerType === CREATE_EMAIL_TYPES?.FORWARD) {
          const formDataForward = new FormData();
          formDataForward.append('messageId', currentEmailAssets?.messageId);
          formDataForward.append('to', values?.to);
          formDataForward.append('subject', values?.subject);
          formDataForward.append('content', values?.description || '<p></p>');

          if (!values?.attachments) {
            formDataForward.append('attachments', values?.attachments);
          }
          if (values?.cc && values?.cc?.trim() !== '') {
            formDataForward.append('cc', values?.cc);
          }
          if (values?.bcc && values?.bcc?.trim() !== '') {
            formDataForward.append('bcc', values?.bcc);
          }

          try {
            await postforwardOutlookEmail({
              body: formDataForward,
            })?.unwrap();
            enqueueSnackbar('Forward successfully', {
              variant: 'success',
            });
            setOpenDrawer(false);
            reset();
            setAutocompleteValues([]);
          } catch (error: any) {
            enqueueSnackbar('Something went wrong !', { variant: 'error' });
          }
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
    isToValid,
    isLoadingForward,

    setToStateDep,
    toStateDep,
  };
};
export default useSendEmailDrawer;
