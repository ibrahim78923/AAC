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
import { CREATE_EMAIL_TYPES, indexNumbers } from '@/constants';
import { useEffect, useState } from 'react';
import {
  useForwardEmailOutlookMutation,
  usePostDraftEmailOutlookMutation,
  usePostReplyEmailOutlookMutation,
  usePostScheduleEmailOutlookMutation,
  usePostSendEmailOutlookMutation,
} from '@/services/commonFeatures/email/outlook';
import {
  DrawerTypeI,
  EmailAssetsI,
  SetAutocompleteValuesI,
  SetValueI,
} from './sendEmail.interface';
import { useDispatch } from 'react-redux';
import { setCurrentForwardAttachments } from '@/redux/slices/email/outlook/slice';

const useSendEmailDrawer = ({
  setOpenDrawer,
  drawerType,
  emailSettingsData,
}: any) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [isReplaceTemplate, setIsReplaceTemplate] = useState(false);

  const currentEmailAssets = useAppSelector(
    (state: any) => state?.outlook?.currentEmailAssets,
  );
  const [isSendLater, setIsSendLater] = useState(false);
  const methodsDealsTasks: any = useForm({
    resolver: yupResolver(emailValidationsSchema(drawerType, isSendLater)),
    defaultValues: emailDefaultValues,
  });
  const currentForwardAttachments = useAppSelector(
    (state: any) => state?.outlook?.currentForwardAttachments,
  );

  const [autocompleteValues, setAutocompleteValues] = useState<string[]>([]);
  const [autocompleteCCValues, setAutocompleteCCValues] = useState<string[]>(
    [],
  );
  const [autocompleteBCCValues, setAutocompleteBCCValues] = useState<string[]>(
    [],
  );

  const [isLoadingProcessDraft, setIsLoadingProcessDraft] = useState(false);
  const [isProcessDraft, setIsProcessDraft] = useState(false);

  const [isToValid, setisToValid] = useState(false);

  const { handleSubmit, watch, reset, setValue } = methodsDealsTasks;
  const watchEmailsForm = watch([
    'ccChecked',
    'bccChecked',
    'to',
    'sentDate',
    'subject',
    'attachments',
    'template',
    'description',
  ]);

  const templateMessage = watchEmailsForm[6]?.html ?? '';
  const description = watchEmailsForm[7];

  useEffect(() => {
    setValue('to', autocompleteValues);
  }, [autocompleteValues]);
  useEffect(() => {
    setValue('cc', autocompleteCCValues);
  }, [autocompleteCCValues]);
  useEffect(() => {
    setValue('bcc', autocompleteBCCValues);
  }, [autocompleteBCCValues]);

  useEffect(() => {
    if (drawerType === CREATE_EMAIL_TYPES?.FORWARD) {
      setValue('description', currentEmailAssets?.others?.body);
    } else {
      setValue('description', '');
    }
  }, [currentEmailAssets]);

  const updateEmailValues = (
    drawerType: DrawerTypeI,
    setAutocompleteValues: SetAutocompleteValuesI,
    setAutocompleteCCValues: SetAutocompleteValuesI,
    setAutocompleteBCCValues: SetAutocompleteValuesI,
    setValue: SetValueI,
    currentEmailAssets: EmailAssetsI,
  ) => {
    const isReplyOrReplyAll =
      drawerType === CREATE_EMAIL_TYPES?.REPLY ||
      drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL;

    if (isReplyOrReplyAll) {
      if (typeof currentEmailAssets?.from === 'string') {
        setAutocompleteValues([currentEmailAssets?.from ?? '']);
      } else {
        setAutocompleteValues(currentEmailAssets?.from ?? []);
      }
      setAutocompleteCCValues(currentEmailAssets?.others?.cc || []);
      setAutocompleteBCCValues(currentEmailAssets?.others?.bcc ?? []);

      setValue('ccChecked', !!currentEmailAssets?.others?.cc?.length);
      setValue('bccChecked', !!currentEmailAssets?.others?.bcc?.length);
    } else {
      setValue('to', '');
      setValue('cc', '');
      setValue('bcc', '');
      setValue('ccChecked', false);
      setValue('bccChecked', false);
    }
  };

  useEffect(() => {
    updateEmailValues(
      drawerType,
      setAutocompleteValues,
      setAutocompleteCCValues,
      setAutocompleteBCCValues,
      setValue,
      currentEmailAssets,
    );
  }, [drawerType, currentEmailAssets]);

  useEffect(() => {
    if (drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL) {
      setValue('description', '');
      setValue('bccChecked', false);
      setValue('ccChecked', false);
    }
  }, [drawerType]);

  useEffect(() => {
    if (description?.length > 1) {
      setIsReplaceTemplate(true);
    } else {
      handleUseTemplate();
    }
  }, [templateMessage]);

  const handleUseTemplate = () => {
    if (templateMessage) {
      setValue('description', templateMessage);
      setIsReplaceTemplate(false);
    }
  };

  const [postSendOtherEmail, { isLoading: loadingOtherSend }] =
    usePostSendEmailOutlookMutation();
  const [postScheduleOtherEmail, { isLoading: loadingOtherScheduleSend }] =
    usePostScheduleEmailOutlookMutation();
  const [postReplyOtherEmail, { isLoading: loadingOtherReply }] =
    usePostReplyEmailOutlookMutation();
  const [postDraftOtherEmail] = usePostDraftEmailOutlookMutation();

  const [postforwardOutlookEmail, { isLoading: isLoadingForward }] =
    useForwardEmailOutlookMutation();

  const isToExists = watchEmailsForm[indexNumbers?.TWO];
  const isSubjectExists = watchEmailsForm[indexNumbers?.FOUR];

  const handleOnClose = () => {
    setisToValid(false);
    if (
      drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL ||
      drawerType === CREATE_EMAIL_TYPES?.REPLY
    ) {
      if (isToExists?.length > 0 && isSubjectExists?.length > 0) {
        setIsProcessDraft(true);
        setIsSendLater(false);
      } else {
        reset();
        setOpenDrawer(false);
        setAutocompleteValues([]);
        dispatch(setCurrentForwardAttachments([]));
        setIsSendLater(false);
      }
    } else {
      reset();
      setOpenDrawer(false);
      setAutocompleteValues([]);
      dispatch(setCurrentForwardAttachments([]));
      setIsSendLater(false);
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

          if (values?.cc?.length) {
            formDataSend.append('cc', values?.cc);
          }
          if (values?.bcc?.length) {
            formDataSend.append('bcc', values?.bcc);
          }
          if (!isSendLater && values?.attachments) {
            if (Array?.isArray(values?.attachments)) {
              values?.attachments.forEach((file: File) => {
                formDataSend?.append(`attachments`, file);
              });
            } else {
              formDataSend.append('attachments', values?.attachments);
            }
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
          formDataSend.append(
            'content',
            `<div 
            style="font-family:${
              emailSettingsData?.data?.emailSettings?.fontName ?? 'sans-serif'
            }; 
            font-size:${
              emailSettingsData?.data?.emailSettings?.fontSize ?? '14'
            }px ">
            ${values?.description} 
            <br> 
            <div id='SIGNATURE' style="font-size:16px;" >${
              emailSettingsData?.data?.emailSettings?.signature ?? ''
            }</div> 
            </div>` || '<p></p>',
          );

          if (!isSendLater && values?.attachments) {
            if (Array?.isArray(values?.attachments)) {
              values?.attachments.forEach((file: File) => {
                formDataSend?.append(`attachments`, file);
              });
            } else {
              formDataSend.append('attachments', values?.attachments);
            }
          }

          if (values?.cc?.length) {
            formDataSend.append('cc', values?.cc);
          }
          if (values?.bcc?.length) {
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
          try {
            await postReplyOtherEmail({
              to: values?.to,
              cc: values?.cc ?? [],
              bcc: values?.bcc ?? [],
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
          formDataForward.append(
            'content',
            `<div 
            style="font-family:${emailSettingsData?.data?.emailSettings?.fontName}; 
            font-size:${emailSettingsData?.data?.emailSettings?.fontSize}px ">
            ${values?.description} 
            <br> 
            <div style="font-size:16px;" >${emailSettingsData?.data?.emailSettings?.signature}</div> 
            </div>` || '<p></p>',
          );

          if (values?.cc?.length) {
            formDataForward.append('cc', values?.cc);
          }
          if (values?.bcc?.length) {
            formDataForward.append('bcc', values?.bcc);
          }

          currentForwardAttachments?.forEach((data: any) => {
            const base64 = data?.contentBytes;
            const contentType = data?.contentType;
            const fileName = data?.name;

            const blob = base64ToBlob(base64, contentType);
            const file = new File([blob], fileName, { type: contentType });

            formDataForward?.append(`attachments`, file);
          });

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

    setAutocompleteCCValues,
    autocompleteCCValues,

    setAutocompleteBCCValues,
    autocompleteBCCValues,

    isToValid,
    isLoadingForward,

    setToStateDep,
    toStateDep,

    setIsReplaceTemplate,
    isReplaceTemplate,
    handleUseTemplate,
  };
};
export default useSendEmailDrawer;

export function base64ToBlob(base64: any, contentType: any) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters?.length);

  for (let i = 0; i < byteCharacters?.length; i++) {
    byteNumbers[i] = byteCharacters?.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}
