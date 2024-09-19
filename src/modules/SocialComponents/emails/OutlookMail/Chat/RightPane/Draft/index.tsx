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
import {
  useDeleteEmailOutlookMutation,
  usePostSendEmailOutlookMutation,
} from '@/services/commonFeatures/email/outlook';
import CustomLabel from '@/components/CustomLabel';
import * as yup from 'yup';
import {
  setActiveRecord,
  setFilterMailList,
  setSelectedRecords,
} from '@/redux/slices/email/outlook/slice';
import { useDispatch } from 'react-redux';
import { ImageComponentAttachment } from '../index';

const Draft = ({ messageDetailsData }: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [defaultValuesEmail, setDefaultValuesEmail] = useState<any>({});

  const [autocompleteValues, setAutocompleteValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const [defaultAttachments, setDefaultAttachments] = useState<any>([]);

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
  const [deleteEmailOutlook, { isLoading: loadingDelete }] =
    useDeleteEmailOutlookMutation();

  const onSubmit = async (values: any) => {
    const formDataSend = new FormData();
    formDataSend.append('to', autocompleteValues?.join(', '));
    formDataSend.append('subject', values?.subject);
    formDataSend.append('content', values?.description ?? ' ');

    if (values?.cc && values?.cc?.trim() !== '') {
      formDataSend.append('cc', values?.cc);
    }
    if (values?.bcc && values?.bcc?.trim() !== '') {
      formDataSend.append('bcc', values?.bcc);
    }
    const base64ToBlob = (base64: string, contentType: string) => {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    };

    if (defaultAttachments && Array.isArray(defaultAttachments)) {
      defaultAttachments.forEach((data: any) => {
        const base64 = data?.contentBytes;
        const contentType = data?.contentType;
        const fileName = data?.name;

        if (base64 && contentType && fileName) {
          const blob = base64ToBlob(base64, contentType);
          const file = new File([blob], fileName, { type: contentType });
          formDataSend.append('attachments', file);
        }
      });
    }
    if (values?.attachments) {
      if (Array.isArray(values.attachments)) {
        values.attachments.forEach((file: File) => {
          formDataSend.append('attachments', file);
        });
      } else {
        formDataSend.append('attachments', values?.attachments);
      }
    }

    try {
      await postSendOtherEmail({
        body: formDataSend,
      })?.unwrap();

      try {
        await deleteEmailOutlook({
          body: {
            messageIds: [activeRecord?.id],
          },
        })?.unwrap();
        enqueueSnackbar('Mail permanently deleted', {
          variant: 'success',
        });
        dispatch(setFilterMailList(activeRecord?.id ? [activeRecord?.id] : []));
        dispatch(setSelectedRecords([]));
        dispatch(setActiveRecord({}));
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
      enqueueSnackbar('Email send successfully', {
        variant: 'success',
      });
      reset();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const activeRecordLengthCheck =
    defaultValuesEmail && Object.keys(defaultValuesEmail)?.length;

  useEffect(() => {
    reset({
      subject: activeRecordLengthCheck
        ? defaultValuesEmail?.subject === 'undefined'
          ? ''
          : defaultValuesEmail?.subject
        : '',
      template: '',
      description: activeRecordLengthCheck
        ? defaultValuesEmail?.body?.content === 'undefined'
          ? ''
          : defaultValuesEmail?.body?.content
        : '',
    });
  }, [defaultValuesEmail]);

  useEffect(() => {
    if (messageDetailsData?.data) {
      setDefaultValuesEmail(messageDetailsData?.data?.value[0]);
      setDefaultAttachments(
        messageDetailsData?.data?.value[0]?.attachments || [],
      );
    }
  }, [messageDetailsData?.data]);

  useEffect(() => {
    setAutocompleteValues(
      activeRecordLengthCheck
        ? defaultValuesEmail?.toRecipients?.map(
            (item: any) => item?.emailAddress?.address,
          )
        : [],
    );
  }, [defaultValuesEmail]);

  useEffect(() => {
    if (messageDetailsData?.data) {
      setDefaultValuesEmail(messageDetailsData?.data?.value[0]);
    }
  }, [messageDetailsData?.data]);

  const removeAttachment = (id: string) => {
    const updatedAttachments = defaultAttachments.filter(
      (attachment: any) => attachment.id !== id,
    );
    setDefaultAttachments(updatedAttachments);
  };

  return (
    <Box>
      {Object.keys(defaultValuesEmail)?.length ? (
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

                {defaultAttachments?.map((item: any) => {
                  return (
                    <>
                      <Box
                        onClick={() => removeAttachment(item.id)}
                        sx={{
                          borderRadius: '8px',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ImageComponentAttachment
                          base64={item?.contentBytes}
                          contentType={item?.contentType}
                          fileName={item?.name}
                        />
                      </Box>
                    </>
                  );
                })}

                <Grid item xs={12}>
                  <RHFDropZone name="attachFile" label="Attachments" />
                </Grid>

                <Box
                  sx={{
                    display: 'flex',
                    gap: '20px',
                    mt: 2,
                    marginLeft: '20px',
                  }}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ height: '36px' }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    loading={loadingOtherSend || loadingDelete}
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
