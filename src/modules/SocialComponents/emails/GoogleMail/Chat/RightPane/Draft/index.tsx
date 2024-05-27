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
import {
  useGetMailFoldersQuery,
  usePostSendOtherEmailMutation,
} from '@/services/commonFeatures/email/others';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setMailTabType } from '@/redux/slices/email/others/slice';
import { LoadingButton } from '@mui/lab';
import { EMAIL_TABS_TYPES } from '@/constants';

const Draft = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const activeRecord: any = useAppSelector(
    (state: any) => state?.email?.activeRecord,
  );
  const methods: any = useForm({
    resolver: yupResolver(emailDraftValidationsSchema),
    defaultValues: {},
  });
  const { handleSubmit, watch, reset } = methods;

  const watchEmailsForm = watch(['ccChecked', 'bccChecked', 'to']);

  const { data: foldersData } = useGetMailFoldersQuery({});

  const fetchedSentFolder = foldersData?.data?.find(
    (folder: any) =>
      folder?.display_name?.toLowerCase() === EMAIL_TABS_TYPES?.SENT,
  );
  const [postSendOtherEmail, { isLoading: loadingOtherSend }] =
    usePostSendOtherEmailMutation();

  const onSubmit = async (values: any) => {
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
      await postSendOtherEmail({
        body: formDataSend,
      })?.unwrap();
      enqueueSnackbar('Email send successfully', {
        variant: 'success',
      });
      dispatch(setMailTabType(fetchedSentFolder));
      reset();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const activeRecordLengthCheck = Object.keys(activeRecord)?.length;

  useEffect(() => {
    reset({
      to: activeRecordLengthCheck ? activeRecord?.to[0]?.email : '',
      subject: activeRecordLengthCheck
        ? activeRecord?.subject === 'undefined'
          ? ''
          : activeRecord?.subject
        : '',
      template: '',
      description: activeRecordLengthCheck
        ? activeRecord?.body === 'undefined'
          ? ''
          : activeRecord?.body
        : '',
      cc: activeRecordLengthCheck ? activeRecord?.cc[0]?.email : '',
      bcc: activeRecordLengthCheck ? activeRecord?.bcc[0]?.email : '',
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
                    {options?.map((option: any) => (
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
