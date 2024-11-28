import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  emailDefaultValues,
  emailValidationsSchema,
} from './EmailEditorDrawer.data';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  useForwardSendGmailMutation,
  usePostReplyOtherGmailMutation,
  usePostSendGmailMutation,
} from '@/services/commonFeatures/email/gmail';
import { CREATE_EMAIL_TYPES, indexNumbers } from '@/constants';
import { isNullOrEmpty } from '@/utils';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useEmailEditorDrawer = (
  setOpenDrawer: any,
  companyId: any,
  selectedCheckboxes: any,
  setSelectedCheckboxes: any,
  openDrawer: any,
) => {
  const theme = useTheme();
  const methodsdealsTasks = useForm({
    resolver: yupResolver(emailValidationsSchema),
    defaultValues: emailDefaultValues,
  });
  const [autocompleteValues, setAutocompleteValues] = useState<string[]>([]);
  const [forwardAttachments, setForwardAttachments] = useState([]);

  const { handleSubmit, watch, setValue, reset } = methodsdealsTasks;
  const watchEmailsForm = watch(['ccChecked', 'bccChecked']);

  useEffect(() => {
    setValue('to', autocompleteValues);
  }, [autocompleteValues]);

  const [postSendGmail, { isLoading: isLoadingSend }] =
    usePostSendGmailMutation();
  const [forwardSendGmail, { isLoading: loadingForwardGmail }] =
    useForwardSendGmailMutation();
  const [postReplyGmail, { isLoading: loadingReplyGmail }] =
    usePostReplyOtherGmailMutation();

  useEffect(() => {
    if (openDrawer === CREATE_EMAIL_TYPES?.FORWARD) {
      setValue(
        'description',
        ` <br> <br><br>
          ---------- Forwarded message --------- 
          <br> <b> from </b>: ${selectedCheckboxes[indexNumbers?.ZERO]
            ?.from}<br>
           <b> subject </b> : ${selectedCheckboxes[indexNumbers?.ZERO]
             ?.subject}<br>
           <b> to </b> : ${selectedCheckboxes[indexNumbers?.ZERO]
             ?.to}  <br>  <br>
         ${selectedCheckboxes[indexNumbers?.ZERO]?.message}
             <br>
          `,
      );
    } else {
      setValue('description', '');
    }
  }, [!isNullOrEmpty(selectedCheckboxes), openDrawer]);

  const onSubmit = async (values: any) => {
    if (openDrawer === CREATE_EMAIL_TYPES?.NEW_EMAIL) {
      if (!values?.to || values?.to?.length === 0) {
        errorSnackbar('Please Enter Email');
        return false;
      }

      if (!values?.description || values?.description?.trim() === '') {
        errorSnackbar('Please Enter Description');

        return false;
      }
      const formDataSend = new FormData();
      formDataSend.append('to', values?.to);
      if (values?.subject) {
        formDataSend.append('subject', values?.subject);
      }
      formDataSend.append('content', `${values?.description}` || '<p></p>');
      if (values?.cc && values?.cc?.trim() !== '') {
        formDataSend.append('cc', values?.cc);
      }
      if (values?.bcc && values?.bcc?.trim() !== '') {
        formDataSend.append('bcc', values?.bcc);
      }

      formDataSend.append('companyIds', companyId);

      if (values?.attachFile) {
        if (Array?.isArray(values?.attachFile)) {
          values?.attachFile.forEach((file: File) => {
            formDataSend?.append(`attachments`, file);
          });
        } else {
          formDataSend.append('attachments', values?.attachFile);
        }
      }

      try {
        await postSendGmail({
          body: formDataSend,
        })?.unwrap();
        successSnackbar('Email send successfully');
        setOpenDrawer('');
        reset();
        setAutocompleteValues([]);
        setSelectedCheckboxes([]);
      } catch (error: any) {
        errorSnackbar('Something went wrong !');
      }
    } else if (openDrawer === CREATE_EMAIL_TYPES?.FORWARD) {
      if (!values?.to || values?.to?.length === 0) {
        errorSnackbar('Please Enter Email');
        return false;
      }
      const formDataSend = new FormData();
      formDataSend.append(
        'id',
        selectedCheckboxes[indexNumbers?.ZERO]?.messageId,
      );
      formDataSend.append(
        'threadId',
        selectedCheckboxes[indexNumbers?.ZERO]?.threadId,
      );
      formDataSend.append('to', values?.to);
      formDataSend.append(
        'content',
        `<div>
        ${values?.description} 
        <br> 
        </div>` || '<p></p>',
      );

      if (values?.cc && values?.cc?.trim() !== '') {
        formDataSend.append('cc', values?.cc);
      }
      if (values?.bcc && values?.bcc?.trim() !== '') {
        formDataSend.append('bcc', values?.bcc);
      }
      formDataSend.append('companyIds', companyId);

      if (values?.attachFile) {
        if (Array?.isArray(values?.attachFile)) {
          values?.attachFile.forEach((file: File) => {
            formDataSend?.append(`attachments`, file);
          });
        } else {
          formDataSend.append('attachments', values?.attachFile);
        }
      }

      forwardAttachments?.forEach((data: any) => {
        const base64 = data?.data;
        const contentType = data?.mimeType;
        const fileName = data?.filename;

        const blob = base64ToBlob(base64, contentType);
        const file = new File([blob], fileName, { type: contentType });

        formDataSend?.append(`attachments`, file);
      });

      try {
        await forwardSendGmail({
          body: formDataSend,
        })?.unwrap();
        successSnackbar('Email Forward successfully');
        setOpenDrawer('');
        reset();
        setAutocompleteValues([]);
        setAutocompleteValues([]);
        setSelectedCheckboxes([]);
      } catch (error: any) {
        errorSnackbar('Something went wrong !');
      }
    }
    if (openDrawer === CREATE_EMAIL_TYPES?.REPLY) {
      if (!values?.description || values?.description?.trim() === '') {
        errorSnackbar('Please Enter Description');

        return false;
      }
      const formDataReply = new FormData();
      formDataReply.append(
        'id',
        selectedCheckboxes[indexNumbers?.ZERO]?.messageId,
      );
      formDataReply.append(
        'threadId',
        selectedCheckboxes[indexNumbers?.ZERO]?.threadId,
      );
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

      try {
        await postReplyGmail({
          body: formDataReply,
        })?.unwrap();
        successSnackbar('Email reply send successfully');
        setOpenDrawer('');
        reset();
        setAutocompleteValues([]);
        setSelectedCheckboxes([]);
      } catch (error: any) {
        errorSnackbar('Something went wrong !');
      }
    }
  };

  return {
    handleSubmit,
    onSubmit,
    methodsdealsTasks,
    watchEmailsForm,
    theme,
    autocompleteValues,
    setAutocompleteValues,
    isLoadingSend,
    loadingReplyGmail,
    loadingForwardGmail,
    forwardAttachments,
    setForwardAttachments,
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

export default useEmailEditorDrawer;
