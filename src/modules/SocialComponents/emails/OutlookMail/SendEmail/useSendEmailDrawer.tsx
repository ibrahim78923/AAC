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

  const methodsDealsTasks: any = useForm({
    resolver: yupResolver(emailValidationsSchema(drawerType)),
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

  const [postSendOtherEmail, { isLoading: loadingOtherSend }] =
    usePostSendEmailOutlookMutation();
  const [postScheduleOtherEmail, { isLoading: loadingOtherScheduleSend }] =
    usePostScheduleEmailOutlookMutation();
  const [postReplyOtherEmail, { isLoading: loadingOtherReply }] =
    usePostReplyEmailOutlookMutation();
  const [postDraftOtherEmail] = usePostDraftEmailOutlookMutation();

  const [postforwardOutlookEmail] = useForwardEmailOutlookMutation();

  const handleOnClose = () => {
    if (drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL) {
      setIsProcessDraft(true);
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

  const [isSendLater, setIsSendLater] = useState(false);

  const [sendLaterDate, setSendLaterDate] = useState<any>();

  const isToExists = watchEmailsForm[2];

  useEffect(() => {
    if (isToExists?.length === 0) {
      null;
    } else {
      setisToValid(false);
    }
  }, [isToExists]);

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
    if (isToExists?.length === 0) {
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
            values?.description?.length ? values?.description : '',
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
  };
};
export default useSendEmailDrawer;
