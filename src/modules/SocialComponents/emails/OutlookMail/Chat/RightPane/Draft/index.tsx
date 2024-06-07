import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
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
import { enqueueSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { usePostSendEmailOutlookMutation } from '@/services/commonFeatures/email/outlook';
import CustomLabel from '@/components/CustomLabel';
import * as yup from 'yup';

const Draft = () => {
  const theme = useTheme();

  const [autocompleteValues, setAutocompleteValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAutocompleteChange = (_: any, newValue: string[]) => {
    setAutocompleteValues(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const emailSchema = yup?.string()?.email()?.required();
  const checkEmails = (emails: string[]) => {
    try {
      yup?.array()?.of(emailSchema)?.required()?.validateSync(emails);
      return true;
    } catch (error) {
      return false;
    }
  };
  const isValidEmails = checkEmails(autocompleteValues);

  const activeRecord: any = useAppSelector(
    (state: any) => state?.outlook?.activeRecord,
  );
  const methods: any = useForm({
    resolver: yupResolver(emailDraftValidationsSchema),
    defaultValues: {},
  });
  const { handleSubmit, watch, reset } = methods;

  const watchEmailsForm = watch(['ccChecked', 'bccChecked', 'to']);

  const [postSendOtherEmail, { isLoading: loadingOtherSend }] =
    usePostSendEmailOutlookMutation();

  const onSubmit = async (values: any) => {
    const formDataSend = new FormData();
    formDataSend.append('to', autocompleteValues?.join(', '));
    formDataSend.append('subject', values?.subject);
    formDataSend.append('content', values?.description);

    if (values?.attachments) {
      formDataSend.append('attachments', values?.attachments);
    }
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
      reset();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const activeRecordLengthCheck =
    activeRecord && Object.keys(activeRecord)?.length;

  useEffect(() => {
    reset({
      subject: activeRecordLengthCheck
        ? activeRecord?.subject === 'undefined'
          ? ''
          : activeRecord?.subject
        : '',
      template: '',
      description: activeRecordLengthCheck
        ? activeRecord?.body?.content === 'undefined'
          ? ''
          : activeRecord?.body?.content
        : '',
    });
  }, [activeRecord]);

  useEffect(() => {
    setAutocompleteValues(
      activeRecordLengthCheck
        ? activeRecord?.toRecipients?.map(
            (item: any) => item?.emailAddress?.address,
          )
        : [],
    );
  }, [activeRecord]);

  return (
    <Box>
      {Object.keys(activeRecord)?.length ? (
        <>
          <Box sx={styles?.draftWrap}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    multiple
                    freeSolo
                    id="tags-filled"
                    options={[]}
                    value={autocompleteValues}
                    onChange={handleAutocompleteChange}
                    renderTags={(value: readonly string[], getTagProps) =>
                      value?.map((option: string, index: number) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                          key={uuidv4()}
                        />
                      ))
                    }
                    renderInput={(params: any) => (
                      <>
                        <CustomLabel label={'To'} required={true} />
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Enter email"
                          size="small"
                          value={inputValue}
                          onChange={handleInputChange}
                          helperText={
                            isValidEmails ? (
                              params.inputProps?.value?.length > 1 ? (
                                <Typography fontSize={12}>
                                  Press enter to add email
                                </Typography>
                              ) : null
                            ) : (
                              <Typography color={theme?.palette?.error?.main}>
                                Email you entered is not valid
                              </Typography>
                            )
                          }
                        />
                      </>
                    )}
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
