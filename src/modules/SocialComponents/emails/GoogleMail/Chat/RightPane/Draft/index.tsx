import React, { useEffect } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import {
  FormProvider,
  RHFCheckbox,
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './draft.styles';
import { options } from '../../../SendEmail/SendEmailDrawer.data';
import { emailDraftValidationsSchema } from './draft.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@/redux/store';
import { MailColoredIcon } from '@/assets/icons';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { EMAIL_TABS_TYPES } from '@/constants';
import {
  useGetGmailFoldersQuery,
  usePostDraftSendGmailMutation,
} from '@/services/commonFeatures/email/gmail';
import { setGmailTabType } from '@/redux/slices/email/gmail/slice';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

interface templateOptionsI {
  value: string;
  label: string;
}

const Draft = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const activeRecord: any = useAppSelector(
    (state: any) => state?.gmail?.activeGmailRecord,
  );
  const methods: any = useForm({
    resolver: yupResolver(emailDraftValidationsSchema),
    defaultValues: {},
  });
  const { handleSubmit, watch, reset } = methods;

  const watchEmailsForm = watch(['ccChecked', 'bccChecked', 'to']);

  const { data: foldersData } = useGetGmailFoldersQuery({});

  const fetchedSentFolder = foldersData?.data?.labels?.find(
    (folder: { name: string }) =>
      folder?.name?.toLowerCase() === EMAIL_TABS_TYPES?.SENT,
  );
  const [postSendGmail, { isLoading: loadingOtherSend }] =
    usePostDraftSendGmailMutation();
  let email: any;

  const emailPattern = /<([^>]+)>/;
  const match = activeRecord?.to?.match(emailPattern);
  if (match) {
    email = match[1];
  } else {
    email = activeRecord?.to;
  }

  const onSubmit = async (values: any) => {
    if (!values?.to || values?.to?.length === 0) {
      errorSnackbar('Please Enter Email');
      return false;
    }

    if (!values?.description || values?.description?.trim() === '') {
      errorSnackbar('Please Enter Description');

      return false;
    }
    const formDataSend = new FormData();
    formDataSend.append('draftId', activeRecord?.draftId);
    formDataSend.append('to', email);
    if (values?.subject) {
      formDataSend.append('subject', values?.subject);
    }
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
      await postSendGmail({
        body: formDataSend,
      })?.unwrap();
      successSnackbar('Email send successfully');
      dispatch(setGmailTabType(fetchedSentFolder));

      reset();
    } catch (error: any) {
      errorSnackbar('Something went wrong !');
    }
  };

  const activeRecordLengthCheck = Object.keys(activeRecord)?.length;

  useEffect(() => {
    reset({
      to: activeRecordLengthCheck ? email : '',
      subject: activeRecordLengthCheck
        ? activeRecord?.subject === 'undefined'
          ? ''
          : activeRecord?.subject
        : '',
      template: '',
      description: activeRecordLengthCheck
        ? activeRecord?.snippet === 'undefined'
          ? ''
          : activeRecord?.snippet
        : '',
      cc: activeRecordLengthCheck ? activeRecord?.cc : '',
      bcc: activeRecordLengthCheck ? activeRecord?.bcc : '',
    });
  }, [activeRecord]);

  return (
    <Box>
      {Object.keys(activeRecord)?.length ? (
        <>
          <Box sx={styles?.draftWrap(theme)}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <RHFTextField
                    name="to"
                    label="to"
                    size="small"
                    required={true}
                  />
                </Grid>
                <Grid item xs={2} sx={{ mt: 3 }}>
                  <RHFCheckbox name="fromChecked" label="From" />
                </Grid>
                <Grid item xs={2} sx={{ mt: 3 }}>
                  <RHFCheckbox name="ccChecked" label="CC" />
                </Grid>
                <Grid item xs={2} sx={{ mt: 3 }}>
                  <RHFCheckbox name="bccChecked" label="BCC" />
                </Grid>

                {watchEmailsForm[0] && (
                  <Grid item xs={12}>
                    <RHFTextField name="cc" label="CC" size="small" />
                  </Grid>
                )}
                {watchEmailsForm[1] && (
                  <Grid item xs={12}>
                    <RHFTextField name="bcc" label="BCC" size="small" />
                  </Grid>
                )}

                <Grid item xs={6}>
                  <RHFTextField name="subject" label="Subject" size="small" />
                </Grid>

                <Grid item xs={6}>
                  <RHFSelect name="template" label="Template" size="small">
                    {options?.map((option: templateOptionsI) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </RHFSelect>
                </Grid>

                <Grid item xs={12}>
                  <RHFEditor
                    name="description"
                    label="Description"
                    required={true}
                  />
                </Grid>

                <Grid item xs={12}>
                  <RHFDropZone name="attachFile" label="Attachments" />
                </Grid>

                <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ height: '36px' }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    loading={loadingOtherSend}
                    variant="contained"
                    type="submit"
                    sx={{ height: '36px' }}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    Send
                  </LoadingButton>
                </Box>
              </Grid>
            </FormProvider>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            background: theme?.palette?.common?.white,
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <MailColoredIcon />
            <Typography variant="body2" sx={{ opacity: '0.7', mt: 1 }}>
              Select an item to read
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: '0.7', fontSize: '12px' }}
            >
              Nothing is Selected
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Draft;
