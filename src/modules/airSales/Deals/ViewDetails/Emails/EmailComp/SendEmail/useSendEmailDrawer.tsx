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
import {
  CREATE_EMAIL_TYPES,
  DATE_TIME_FORMAT,
  indexNumbers,
  MAIL_KEYS,
} from '@/constants';
import { useEffect, useState } from 'react';
import {
  useForwardEmailOutlookMutation,
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
import {
  setCurrentEmailAssets,
  setCurrentForwardAttachments,
} from '@/redux/slices/email/outlook/slice';
import dayjs from 'dayjs';
import {
  useForwardSendGmailMutation,
  usePostReplyOtherGmailMutation,
  usePostSendGmailMutation,
} from '@/services/commonFeatures/email/gmail';
const useSendEmailDrawer = ({
  setOpenDrawer,
  drawerType,
  emailSettingsData,
  moduleId,
  moduleType,
}: any) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [valueProvider, setValueProvider] = useState('');

  const [isReplaceTemplate, setIsReplaceTemplate] = useState(false);
  const currentEmailAssets = useAppSelector(
    (state: any) => state?.outlook?.currentEmailAssets,
  );
  const methodsDealsTasks: any = useForm({
    resolver: yupResolver(emailValidationsSchema(drawerType)),
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
  const [isToValid, setisToValid] = useState(false);

  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);

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

  function extractEmail(data: string): string | null {
    const regex = /<(.+?)>/;
    const match = data.match(regex);
    if (match) {
      return match[1].trim();
    } else if (/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(data)) {
      return data.trim();
    }

    return null;
  }

  // Update Fields Default Values
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
        setAutocompleteValues([extractEmail(currentEmailAssets?.from) ?? '']);
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
    setValueProvider(currentEmailAssets?.provider ?? '');
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

  // Replace email body with template

  const handleUseTemplate = () => {
    if (templateMessage) {
      setValue('description', templateMessage);
      setIsReplaceTemplate(false);
    }
  };

  // Post Mutations
  const [postScheduleOtherEmail, { isLoading: loadingOtherScheduleSend }] =
    usePostScheduleEmailOutlookMutation();

  const [postSendOtherEmail, { isLoading: loadingOtherSend }] =
    usePostSendEmailOutlookMutation();
  const [postReplyOtherEmail, { isLoading: loadingOtherReply }] =
    usePostReplyEmailOutlookMutation();
  const [postforwardOutlookEmail, { isLoading: isLoadingForward }] =
    useForwardEmailOutlookMutation();

  const [postSendGmail, { isLoading: isLoadingSend }] =
    usePostSendGmailMutation();
  const [forwardSendGmail, { isLoading: loadingForwardGmail }] =
    useForwardSendGmailMutation();
  const [postReplyGmail, { isLoading: loadingReplyGmail }] =
    usePostReplyOtherGmailMutation();

  const postForwardCase =
    valueProvider === MAIL_KEYS?.OUTLOOK
      ? postforwardOutlookEmail
      : forwardSendGmail;

  const postReply =
    valueProvider === MAIL_KEYS?.OUTLOOK ? postReplyOtherEmail : postReplyGmail;

  const isToExists = watchEmailsForm[indexNumbers?.TWO];

  // onClose Drawer
  const handleOnClose = () => {
    setisToValid(false);
    reset();
    scheduleReset();
    setOpenDrawer(false);
    setAutocompleteValues([]);
    dispatch(setCurrentForwardAttachments([]));
    dispatch(setCurrentEmailAssets({}));
  };

  // To State Dependency
  const [toStateDep, setToStateDep] = useState(1);
  useEffect(() => {
    if (isToExists?.length === 0 || isToExists?.length === undefined) {
      null;
    } else {
      setisToValid(false);
    }
  }, [isToExists, toStateDep]);

  // Schedule Email Operations
  const methodsScheduleEmail = useForm<any>({
    resolver: yupResolver(scheduleEmailValidationSchema),
    defaultValues: scheduleEmailDefaultValues,
  });
  const {
    handleSubmit: handleScheduleEmail,
    watch: watchScheduleValues,
    reset: scheduleReset,
  } = methodsScheduleEmail;
  const watchEmailsScheduleForm: any = watchScheduleValues();
  const scheduleDate = watchEmailsScheduleForm.date;
  const scheduleTime = watchEmailsScheduleForm.time;
  const date = dayjs(scheduleDate);
  const time = dayjs(scheduleTime);
  const mergedDateTime = date
    .hour(time.hour())
    .minute(time.minute())
    .second(time.second())
    .format(DATE_TIME_FORMAT?.YYYY_MM_DDTHH_MM_SS_Z);
  const isScheduleExists =
    scheduleDate?.toString()?.length > 0 &&
    scheduleTime?.toString()?.length > 0;

  //Post or Schedule Email Mutations
  const postEmail =
    valueProvider === MAIL_KEYS?.OUTLOOK
      ? isScheduleExists
        ? postScheduleOtherEmail
        : postSendOtherEmail
      : postSendGmail;

  const onSubmit = async (values: any) => {
    setToStateDep(toStateDep + 1);
    if (
      ((drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL ||
        drawerType === CREATE_EMAIL_TYPES?.FORWARD) &&
        isToExists?.length === 0) ||
      isToExists?.length === undefined
    ) {
      setisToValid(true);
    } else {
      setisToValid(false);
      // Create Draft
      if (drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL) {
        const formDataSend = new FormData();
        if (moduleType === 'DEAL') {
          formDataSend.append('dealIds', moduleId);
        }
        if (moduleType === 'CONTACT') {
          formDataSend.append('contactIds', moduleId);
        }
        if (moduleType === 'COMPANY') {
          formDataSend.append('companyIds', moduleId);
        }
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
        if (!isScheduleExists && values?.attachments) {
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
        if (isScheduleExists) {
          if (mergedDateTime) {
            formDataSend.append('sentOn', mergedDateTime);
          }
        }

        try {
          await postEmail({
            body: formDataSend,
          })?.unwrap();
          enqueueSnackbar(
            isScheduleExists
              ? 'Email scheduled successfully'
              : 'Email send successfully',
            {
              variant: 'success',
            },
          );
          setOpenDrawer(false);
          reset();
          scheduleReset();
          setIsScheduleDrawerOpen(false);
          reset({
            sentDate: null,
          });
          setAutocompleteValues([]);
        } catch (error: any) {
          enqueueSnackbar('Something went wrong !', { variant: 'error' });
        }
      }
      if (
        drawerType === CREATE_EMAIL_TYPES?.REPLY ||
        drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL
      ) {
        // ONLY GMAIL CASE ++
        const formDataReply = new FormData();
        formDataReply.append('id', currentEmailAssets?.messageId);
        formDataReply.append('threadId', currentEmailAssets?.threadId);
        formDataReply.append(
          'content',
          `<div>
        ${values?.description} 
        <br> 
        </div>` || '<p></p>',
        );
        formDataReply.append('type', 'reply');

        if (values?.attachFile) {
          if (Array?.isArray(values?.attachFile)) {
            values?.attachFile.forEach((file: File) => {
              formDataReply?.append(`attachments`, file);
            });
          } else {
            formDataReply.append('attachments', values?.attachFile);
          }
        }
        // ONLY GMAIL CASE --
        try {
          await postReply({
            ...(valueProvider === MAIL_KEYS?.OUTLOOK && {
              to: values?.to,
              cc: values?.cc ?? [],
              bcc: values?.bcc ?? [],
              messageId: currentEmailAssets?.messageId,
              type:
                drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL
                  ? 'reply-all'
                  : 'reply',
              replyText: values?.description,
            }),
            ...(valueProvider === MAIL_KEYS?.GMAIL && { body: formDataReply }),
          })?.unwrap();
          enqueueSnackbar(
            drawerType === CREATE_EMAIL_TYPES?.REPLY
              ? 'Email reply send successfully'
              : 'Reply send successfully',
            {
              variant: 'success',
            },
          );
          setOpenDrawer(false);
          scheduleReset();
          reset();
          setAutocompleteValues([]);
        } catch (error: any) {
          enqueueSnackbar('Something went wrong !', { variant: 'error' });
        }
      }
      if (drawerType === CREATE_EMAIL_TYPES?.FORWARD) {
        const formDataForward = new FormData();

        if (valueProvider === MAIL_KEYS?.GMAIL) {
          formDataForward.append('threadId', currentEmailAssets?.threadId);
          formDataForward.append('id', currentEmailAssets?.messageId);
        }
        if (valueProvider === MAIL_KEYS?.OUTLOOK) {
          formDataForward.append('messageId', currentEmailAssets?.messageId);
        }
        formDataForward.append('to', values?.to);
        if (valueProvider === MAIL_KEYS?.OUTLOOK) {
          formDataForward.append(
            'subject',
            currentEmailAssets?.others?.subject,
          );
        }

        if (!isScheduleExists && values?.attachments) {
          if (Array?.isArray(values?.attachments)) {
            values?.attachments.forEach((file: File) => {
              formDataForward?.append(`attachments`, file);
            });
          } else {
            formDataForward.append('attachments', values?.attachments);
          }
        }

        formDataForward.append(
          'content',
          `<div 
          style="font-family:${emailSettingsData?.data?.emailSettings
            ?.fontName}; 
          font-size:${
            emailSettingsData?.data?.emailSettings?.fontSize ?? '16'
          }px ">
          ${values?.description} 
          <br> 
          <div style="font-size:16px;" >${
            emailSettingsData?.data?.emailSettings?.signature ?? ''
          }</div> 
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
          await postForwardCase({
            body: formDataForward,
          })?.unwrap();
          enqueueSnackbar('Forward successfully', {
            variant: 'success',
          });
          setOpenDrawer(false);
          reset();
          scheduleReset();
          setAutocompleteValues([]);
        } catch (error: any) {
          enqueueSnackbar('Something went wrong !', { variant: 'error' });
        }
      }
    }
  };

  const onSubmitEmail = () => {
    handleSubmit(onSubmit)();
    setIsScheduleDrawerOpen(false);
  };

  return {
    handleSubmit,
    onSubmit,
    methodsDealsTasks,
    watchEmailsForm,
    theme,
    reset,
    setValue,
    loadingOtherSend: loadingOtherSend || isLoadingSend,
    loadingOtherScheduleSend,
    loadingOtherReply: loadingOtherReply || loadingReplyGmail,
    handleOnClose,
    setAutocompleteValues,
    autocompleteValues,

    setAutocompleteCCValues,
    autocompleteCCValues,

    setAutocompleteBCCValues,
    autocompleteBCCValues,

    isToValid,
    isLoadingForward: isLoadingForward || loadingForwardGmail,

    setToStateDep,
    toStateDep,

    setIsReplaceTemplate,
    isReplaceTemplate,
    handleUseTemplate,

    methodsScheduleEmail,
    handleScheduleEmail,
    onSubmitEmail,

    setIsScheduleDrawerOpen,
    isScheduleDrawerOpen,
    scheduleReset,
    isScheduleExists,

    valueProvider,
    setValueProvider,
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
