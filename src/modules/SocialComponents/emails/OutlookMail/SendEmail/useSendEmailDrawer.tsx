import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  emailDefaultValues,
  emailValidationsSchema,
  scheduleEmailDefaultValues,
  scheduleEmailValidationSchema,
} from './SendEmailDrawer.data';
import { useAppSelector } from '@/redux/store';
import {
  CREATE_EMAIL_TYPES,
  DATE_TIME_FORMAT,
  indexNumbers,
} from '@/constants';
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
import dayjs from 'dayjs';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
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
  const [isLoadingProcessDraft, setIsLoadingProcessDraft] = useState(false);
  const [isProcessDraft, setIsProcessDraft] = useState(false);
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

  // Replace email body with template

  const handleUseTemplate = () => {
    if (templateMessage) {
      setValue('description', templateMessage);
      setIsReplaceTemplate(false);
    }
  };

  // Post Mutations
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

  // onClose Drawer
  const handleOnClose = () => {
    setisToValid(false);
    if (
      drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL ||
      drawerType === CREATE_EMAIL_TYPES?.REPLY
    ) {
      if (isToExists?.length > 0 && isSubjectExists?.length > 0) {
        setIsProcessDraft(true);
      } else {
        reset();
        scheduleReset();
        setOpenDrawer(false);
        setAutocompleteValues([]);
        dispatch(setCurrentForwardAttachments([]));
      }
    } else {
      reset();
      scheduleReset();
      setOpenDrawer(false);
      setAutocompleteValues([]);
      dispatch(setCurrentForwardAttachments([]));
    }
  };
  // Process Draft
  useEffect(() => {
    if (isProcessDraft) {
      handleSubmit(onSubmit)();
    }
  }, [isProcessDraft]);

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
    ?.hour(time?.hour())
    ?.minute(time?.minute())
    ?.second(time?.second())
    ?.format(DATE_TIME_FORMAT?.YYYY_MM_DDTHH_MM_SS_Z);
  const isScheduleExists =
    scheduleDate?.toString()?.length > 0 &&
    scheduleTime?.toString()?.length > 0;

  //Post or Schedule Email Mutations
  const postEmail = isScheduleExists
    ? postScheduleOtherEmail
    : postSendOtherEmail;

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
      // Create Draft
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
          if (values?.attachments) {
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
            successSnackbar('Draft saved successfully');
            setIsProcessDraft(false);
            setIsLoadingProcessDraft(false);
            scheduleReset();
            reset();
            setOpenDrawer(false);
            setAutocompleteValues([]);
          } catch (error: any) {
            errorSnackbar('Something went wrong while saving draft !');
            setIsProcessDraft(false);
            setIsLoadingProcessDraft(false);
            scheduleReset();
            reset();
            setOpenDrawer(false);
          }
        } else {
          setIsProcessDraft(false);
          setOpenDrawer(false);
          reset();
        }
      } else {
        // Create Posts
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
            successSnackbar(
              isScheduleExists
                ? 'Email scheduled successfully'
                : 'Email send successfully',
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
            errorSnackbar('Something went wrong !');
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
            successSnackbar(
              drawerType === CREATE_EMAIL_TYPES?.REPLY
                ? 'Email reply send successfully'
                : 'Reply all send successfully',
            );
            setOpenDrawer(false);
            scheduleReset();
            reset();
            setAutocompleteValues([]);
          } catch (error: any) {
            errorSnackbar('Something went wrong !');
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
            successSnackbar('Forward successfully');
            setOpenDrawer(false);
            reset();
            scheduleReset();
            setAutocompleteValues([]);
          } catch (error: any) {
            errorSnackbar('Something went wrong !');
          }
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
    loadingOtherSend,
    loadingOtherScheduleSend,
    loadingOtherReply,
    isLoadingProcessDraft,
    handleOnClose,
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

    methodsScheduleEmail,
    handleScheduleEmail,
    onSubmitEmail,

    setIsScheduleDrawerOpen,
    isScheduleDrawerOpen,
    scheduleReset,
    isScheduleExists,
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
