import { v4 as uuidv4 } from 'uuid';
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
import { styles } from './styles';
import { BackArrowIcon } from '@/assets/icons';
import { useEffect, useState } from 'react';
import CommonModal from '@/components/CommonModal';
import CustomLabel from '@/components/CustomLabel';
import {
  usePostEmailMarketingTemplatesMutation,
  usePostEmailWithTemplatesMutation,
  useUpdateEmailTemplatesMutation,
} from '@/services/airMarketer/emailTemplates';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  emailTemplateSendValidationSchema,
  emailTemplateValidationSchema,
} from './FormFields.data';
import {
  RHFCheckbox,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as yup from 'yup';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { EMAIL_ENUMS } from '@/constants';

const FormBuilder = ({
  titleValue,
  setTitleValue,
  setOpenModal,
  isEditMode,
  templateId,
  isSend,
  data,
  setEditorValueGet,
}: any) => {
  const theme = useTheme();

  const router = useRouter();

  const [autocompleteValues, setAutocompleteValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const [isTitleModal, setIsTitleModal] = useState(false);

  const createTemplateMethods: any = useForm({
    resolver: yupResolver(emailTemplateValidationSchema),
    defaultValues: {},
  });
  const {
    handleSubmit: createTemplateSubmit,
    watch: watchCreateEmail,
    setValue,
  } = createTemplateMethods;
  const watchEditor = watchCreateEmail(['emailTemplate']);

  const editorValue = watchEditor[0];

  const handelPostTemplateProcess = () => {
    if (editorValue && editorValue?.length) {
      if (isSend) {
        handelSubmitEmail();
      } else {
        setIsTitleModal(true);
      }
    } else {
      enqueueSnackbar('Email template must not be empty', {
        variant: 'error',
      });
    }
  };

  const [postEmailMarketingTemplate, { isLoading: loadingPostTemplate }] =
    usePostEmailMarketingTemplatesMutation();
  const [postEmailWithTemplates, { isLoading: loadingPostEmailTemplate }] =
    usePostEmailWithTemplatesMutation();
  const [updateEmailTemplate, { isLoading: loadingUpdateTemplate }] =
    useUpdateEmailTemplatesMutation();

  const handelPostTemplate = async (values: any) => {
    const payload = {
      name: titleValue,
      html: editorValue,
    };

    if (isSend) {
      const formDataSend = new FormData();
      formDataSend.append(
        'to',
        autocompleteValues ? autocompleteValues.join(',') : '',
      );
      formDataSend.append('subject', values?.subject);
      formDataSend.append('content', editorValue);
      formDataSend.append('from', values?.from);
      formDataSend.append('status', EMAIL_ENUMS?.SENT);

      if (values?.cc?.length) {
        formDataSend.append('cc', values?.cc);
      }
      if (values?.bcc?.length) {
        formDataSend.append('bcc', values?.bcc);
      }
      try {
        await postEmailWithTemplates({
          body: formDataSend,
        })?.unwrap();
        enqueueSnackbar('Email send successfully', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar('Something went wrong!', {
          variant: 'error',
        });
      }
    }

    if (isEditMode) {
      try {
        await updateEmailTemplate({
          body: payload,
          id: templateId,
        })?.unwrap();
        enqueueSnackbar('Template updated successfully', {
          variant: 'success',
        });
        router.push(`${AIR_MARKETER?.EMAIL_TEMPLATES}`);
      } catch (error: any) {
        enqueueSnackbar('Something went wrong!', {
          variant: 'error',
        });
      }
    }

    if (!isEditMode) {
      try {
        await postEmailMarketingTemplate({
          body: payload,
        })?.unwrap();
        enqueueSnackbar('Template created successfully', {
          variant: 'success',
        });
        router.push(`${AIR_MARKETER?.EMAIL_TEMPLATES}`);
      } catch (error: any) {
        enqueueSnackbar('Something went wrong!', {
          variant: 'error',
        });
      }
    }
  };

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

  const methods: any = useForm({
    resolver: yupResolver(emailTemplateSendValidationSchema),
    defaultValues: {},
  });
  const { handleSubmit, watch } = methods;

  const watchEmailsForm = watch(['ccChecked', 'bccChecked', 'to']);

  const onSubmit = (values: any) => {
    handelPostTemplate(values);
  };
  const handelSubmitEmail = () => {
    handleSubmit(onSubmit);
  };

  useEffect(() => {
    setValue('emailTemplate', data?.html);
  }, [data]);

  useEffect(() => {
    setEditorValueGet(editorValue);
  }, [editorValue]);

  return (
    <Box sx={styles?.wrapper}>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <Box
            sx={{
              background: theme.palette?.common?.white,
              borderRadius: '8px',
              p: 2,
            }}
          >
            {!isSend && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography
                  variant="h5"
                  display={'flex'}
                  alignItems={'center'}
                  sx={{ pb: 2, cursor: 'pointer' }}
                  onClick={() =>
                    router.push({
                      pathname: `${AIR_MARKETER?.EMAIL_TEMPLATES}`,
                    })
                  }
                >
                  {' '}
                  <Box sx={{ cursor: 'pointer', marginRight: '10px' }}>
                    {' '}
                    <BackArrowIcon />
                  </Box>{' '}
                  {data?.name ?? 'Back To Templates'}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Button variant="outlined" onClick={() => setOpenModal(true)}>
                    Preview
                  </Button>
                  <LoadingButton
                    variant="contained"
                    onClick={handelPostTemplateProcess}
                    loading={loadingPostEmailTemplate}
                  >
                    {isSend ? 'Save and Send' : 'Save'}
                  </LoadingButton>
                </Box>
              </Box>
            )}

            {isSend && (
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ pb: 2, cursor: 'pointer' }}
                    onClick={() =>
                      router.push({
                        pathname: `${AIR_MARKETER?.EMAIL_TEMPLATES}`,
                      })
                    }
                  >
                    {' '}
                    <Box sx={{ cursor: 'pointer', marginRight: '10px' }}>
                      {' '}
                      <BackArrowIcon />
                    </Box>{' '}
                    {data?.name ?? 'Back To Templates'}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => setOpenModal(true)}
                    >
                      Preview
                    </Button>
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      onClick={handelPostTemplateProcess}
                      loading={loadingPostEmailTemplate}
                    >
                      {isSend ? 'Save and Send' : 'Save'}
                    </LoadingButton>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid item xs={6}>
                      <RHFTextField name="from" label="From" size="small" />
                    </Grid>
                  </Grid>

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
                </Grid>
              </FormProvider>
            )}

            <Box>
              <FormProvider
                methods={createTemplateMethods}
                onSubmit={createTemplateSubmit(onSubmit)}
              >
                <Box pb={1.4}>
                  <RHFEditor
                    name="emailTemplate"
                    style={{ height: 600 }}
                    placeholder="Enter Email Text"
                    disabled={false}
                  />
                </Box>
              </FormProvider>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <CommonModal
        open={isTitleModal}
        handleClose={() => setIsTitleModal(false)}
        handleCancel={() => setIsTitleModal(false)}
        handleSubmit={() => handelPostTemplate({})}
        title=""
        okText="Save"
        isSubmitDisabled={titleValue?.length > 0 ? false : true}
        footer
        isLoading={loadingUpdateTemplate || loadingPostTemplate}
      >
        <>
          <CustomLabel label="Template Title" />
          <TextField
            fullWidth
            placeholder="Enter Tile"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            sx={{
              '& input': {
                height: '11px',
                color: theme?.palette?.blue?.main,
              },
            }}
          />
        </>
      </CommonModal>
    </Box>
  );
};

export default FormBuilder;
