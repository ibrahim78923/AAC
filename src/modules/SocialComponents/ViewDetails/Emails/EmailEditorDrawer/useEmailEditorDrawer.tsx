import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  emailDefaultValues,
  emailValidationsSchema,
} from './EmailEditorDrawer.data';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { usePostSendGmailMutation } from '@/services/commonFeatures/email/gmail';

const useEmailEditorDrawer = (setOpenDrawer: any, companyId: any) => {
  const theme = useTheme();
  const methodsdealsTasks = useForm({
    resolver: yupResolver(emailValidationsSchema),
    defaultValues: emailDefaultValues,
  });
  const [autocompleteValues, setAutocompleteValues] = useState<string[]>([]);

  const { handleSubmit, watch, setValue, reset } = methodsdealsTasks;
  const watchEmailsForm = watch(['ccChecked', 'bccChecked']);

  useEffect(() => {
    setValue('to', autocompleteValues);
  }, [autocompleteValues]);

  const [postSendGmail, { isLoading: isLoadingSend }] =
    usePostSendGmailMutation();

  const onSubmit = async (values: any) => {
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
      enqueueSnackbar('Email send successfully', {
        variant: 'success',
      });
      setOpenDrawer('');
      reset();
      setAutocompleteValues([]);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
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
  };
};
export default useEmailEditorDrawer;
