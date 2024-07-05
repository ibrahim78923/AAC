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
  useForwardSendGmailMutation,
  usePostDraftGmailMutation,
  usePostReplyOtherGmailMutation,
  usePostScheduleGmailMutation,
  usePostSendGmailMutation,
} from '@/services/commonFeatures/email/gmail';

const useSendEmailDrawer = ({
  setOpenDrawer,
  drawerType,
  emailSettingsData,
}: any) => {
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

  const [postSendGmail, { isLoading: loadingOtherSend }] =
    usePostSendGmailMutation();
  const [postScheduleGmail, { isLoading: loadingOtherScheduleSend }] =
    usePostScheduleGmailMutation();
  const [postReplyGmail, { isLoading: loadingReplyGmail }] =
    usePostReplyOtherGmailMutation();
  const [postDraftGmail, { isLoading: loadingDraftGmail }] =
    usePostDraftGmailMutation();
  const [forwardSendGmail, { isLoading: loadingForwardGmail }] =
    useForwardSendGmailMutation();

  const currentGmailAssets = useAppSelector(
    (state: any) => state?.gmail?.currentGmailAssets,
  );

  const currentForwardMessage = useAppSelector(
    (state: any) => state?.gmail?.currentForwardMessage,
  );

  useEffect(() => {
    if (drawerType === CREATE_EMAIL_TYPES?.FORWARD) {
      setValue(
        'description',
        ` <br> <br><br>
        ---------- Forwarded message --------- 
        <br> <b> from </b>: ${currentGmailAssets?.others?.from}<br>
        <b> sent </b> : ${currentGmailAssets?.others?.sent}<br>
         <b> subject </b> : ${currentGmailAssets?.others?.subject}<br>
         <b> to </b> : ${currentGmailAssets?.others?.to}  <br>  <br>
         ${currentForwardMessage}
        
           <br>
        `,
      );
    } else {
      setValue('description', '');
    }
  }, [currentGmailAssets]);

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

  const CurrentForwardAttachments = useAppSelector(
    (state: any) => state?.gmail?.CurrentForwardAttachments,
  );

  const postEmail = isSendLater ? postScheduleGmail : postSendGmail;
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
        if (values?.attachFile) {
          formDataSend.append('attachments', values?.attachFile);
        }
        try {
          await postDraftGmail({
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
        if (!values?.to || values?.to?.length === 0) {
          enqueueSnackbar('Please Enter Email', { variant: 'error' });
          return false;
        }

        if (!values?.description || values?.description?.trim() === '') {
          enqueueSnackbar('Please Enter Description', { variant: 'error' });

          return false;
        }
        const formDataSend = new FormData();
        formDataSend.append('to', values?.to);
        if (values?.subject) {
          formDataSend.append('subject', values?.subject);
        }
        formDataSend.append(
          'content',
          `<div 
          style="font-family:${emailSettingsData?.data?.emailSettings?.fontName}; 
          font-size:${emailSettingsData?.data?.emailSettings?.fontSize}px ">
          ${values?.description} 
          <br> 
          <div style="font-size:16px;" >${emailSettingsData?.data?.emailSettings?.signature}</div> 
          </div>` || '<p></p>',
        );
        if (values?.cc && values?.cc?.trim() !== '') {
          formDataSend.append('cc', values?.cc);
        }
        if (values?.bcc && values?.bcc?.trim() !== '') {
          formDataSend.append('bcc', values?.bcc);
        }
        if (sendLaterDate) {
          formDataSend.append('sentOn', sendLaterDate);
        }

        if (!isSendLater && values?.attachFile) {
          if (Array?.isArray(values?.attachFile)) {
            values?.attachFile.forEach((file: File) => {
              formDataSend?.append(`attachments`, file);
            });
          } else {
            formDataSend.append('attachments', values?.attachFile);
          }
        }

        try {
          await postEmail({
            body: formDataSend,
          })?.unwrap();
          enqueueSnackbar('Email send successfully', {
            variant: 'success',
          });
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
        if (!values?.description || values?.description?.trim() === '') {
          enqueueSnackbar('Please Enter Description', { variant: 'error' });

          return false;
        }
        const formDataReply = new FormData();
        formDataReply.append('id', currentGmailAssets?.id);
        formDataReply.append('threadId', currentGmailAssets?.threadId);
        formDataReply.append(
          'content',
          `<div 
          style="font-family:${emailSettingsData?.data?.emailSettings?.fontName}; 
          font-size:${emailSettingsData?.data?.emailSettings?.fontSize}px ">
          ${values?.description} 
          <br> 
          <div style="font-size:16px;" >${emailSettingsData?.data?.emailSettings?.signature}</div> 
          </div>` || '<p></p>',
        );
        formDataReply.append(
          'type',
          drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL ? 'reply-all' : 'reply',
        );

        if (!isSendLater && values?.attachFile) {
          if (Array?.isArray(values?.attachFile)) {
            values?.attachFile.forEach((file: File) => {
              formDataReply?.append(`attachments`, file);
            });
          } else {
            formDataReply.append('attachments', values?.attachFile);
          }
        }

        try {
          await postReplyGmail({
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
          setAutocompleteValues([]);
        } catch (error: any) {
          enqueueSnackbar('Something went wrong !', { variant: 'error' });
        }
      }
      if (drawerType === CREATE_EMAIL_TYPES?.FORWARD) {
        if (!values?.to || values?.to?.length === 0) {
          enqueueSnackbar('Please Enter Email', { variant: 'error' });
          return false;
        }
        const formDataSend = new FormData();
        formDataSend.append('id', currentGmailAssets?.id);
        formDataSend.append('threadId', currentGmailAssets?.threadId);
        formDataSend.append('to', values?.to);
        formDataSend.append(
          'content',
          `<div 
          style="font-family:${emailSettingsData?.data?.emailSettings?.fontName}; 
          font-size:${emailSettingsData?.data?.emailSettings?.fontSize}px ">
          ${values?.description} 
          <br> 
          <div style="font-size:16px;" >${emailSettingsData?.data?.emailSettings?.signature}</div> 
          </div>` || '<p></p>',
        );

        if (values?.cc && values?.cc?.trim() !== '') {
          formDataSend.append('cc', values?.cc);
        }
        if (values?.bcc && values?.bcc?.trim() !== '') {
          formDataSend.append('bcc', values?.bcc);
        }
        if (!isSendLater && values?.attachFile) {
          if (Array?.isArray(values?.attachFile)) {
            values?.attachFile.forEach((file: File) => {
              formDataSend?.append(`attachments`, file);
            });
          } else {
            formDataSend.append('attachments', values?.attachFile);
          }
        }

        CurrentForwardAttachments?.forEach((data: any) => {
          const base64 = data?.base64;
          const contentType = data?.contentType;
          const fileName = data?.fileName;

          const blob = base64ToBlob(base64, contentType);
          const file = new File([blob], fileName, { type: contentType });

          formDataSend?.append(`attachments`, file);
        });

        try {
          await forwardSendGmail({
            body: formDataSend,
          })?.unwrap();
          enqueueSnackbar('Email Forward successfully', {
            variant: 'success',
          });
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
    loadingReplyGmail,
    loadingForwardGmail,
    loadingDraftGmail,
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

function base64ToBlob(base64: any, contentType: any) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters?.length);

  for (let i = 0; i < byteCharacters?.length; i++) {
    byteNumbers[i] = byteCharacters?.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

export default useSendEmailDrawer;
