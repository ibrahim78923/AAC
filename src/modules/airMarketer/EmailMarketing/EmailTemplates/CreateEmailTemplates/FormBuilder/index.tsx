import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import FormField from './FormField';
import FormControls from './FormControls';
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
import { isNullOrEmpty } from '@/utils';
import { BackArrowIcon } from '@/assets/icons';
import { Field } from './interface';
import { fieldTypes, ItemTypes } from '@/constants/form-builder';
import { useState } from 'react';
import CommonModal from '@/components/CommonModal';
import CustomLabel from '@/components/CustomLabel';
import {
  usePostEmailTemplatesMutation,
  usePostEmailWithTemplatesMutation,
  useUpdateEmailTemplatesMutation,
} from '@/services/airMarketer/emailTemplates';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { emailTemplateSendValidationSchema } from './FormFields.data';
import { RHFCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as yup from 'yup';
import { FormProvider } from '@/components/ReactHookForm';
import { generateHTML } from '@/utils/emailTemplate';
import { LoadingButton } from '@mui/lab';

const FormBuilder = ({
  fields,
  setFields,
  titleValue,
  setTitleValue,
  setOpenModal,
  isEditMode,
  templateId,
  isSend,
  data,
}: any) => {
  const theme = useTheme();

  const router = useRouter();

  const [autocompleteValues, setAutocompleteValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleDrop = (item: any) => {
    if (!item?.type) return;

    const newField: Field = {
      _id: uuidv4(),
      type: item?.type,
      name: `field-${fields?.length + 1}`,
      label: `Label ${item?.type}`,
      value:
        item.type === fieldTypes?.text || item.type === fieldTypes?.textarea
          ? ''
          : undefined,
      values:
        item?.type === fieldTypes?.select
          ? [
              { label: 'Option 1', value: 'option-1', selected: false },
              { label: 'Option 2', value: 'option-2', selected: false },
            ]
          : undefined,
      required: false,
      space: item?.type === fieldTypes?.space ? 20 : undefined,
      dividerWidth: item?.type === fieldTypes?.divider ? 1 : undefined,
      dividerColor:
        item?.type === fieldTypes?.divider
          ? theme?.palette?.custom?.light_lavender_gray
          : undefined,
      buttonType: item?.type === fieldTypes?.button ? 'submit' : undefined,
      buttonText: item?.type === fieldTypes?.button ? 'Submit' : undefined,
    };
    setFields([...fields, newField]);
  };

  const [isTitleModal, setIsTitleModal] = useState(false);

  const [, drop] = useDrop({
    accept: ItemTypes.FIELD,
    drop: (item: any, monitor) => {
      const didDropInside = monitor.didDrop();
      if (!didDropInside && item.source === 'control') {
        handleDrop(item);
      }
    },
  });

  const moveField = (dragIndex: number, hoverIndex: number) => {
    const draggedField = fields[dragIndex];
    const updatedFields = [...fields];
    updatedFields.splice(dragIndex, 1);
    updatedFields.splice(hoverIndex, 0, draggedField);
    setFields(updatedFields);
  };

  const handleRemove = (id?: string) => {
    setFields(fields.filter((field: any) => field?._id !== id));
  };

  const handleFieldChange = (
    id: string,
    updatedField: Partial<Field>,
    deleteOption?: string,
  ) => {
    setFields((prevFields: Field[]) =>
      prevFields.map((field: Field) => {
        if (field?._id === id) {
          if (deleteOption) {
            return {
              ...field,
              values: field?.values?.filter(
                (opt) => opt.value !== deleteOption,
              ),
            };
          } else {
            return { ...field, ...updatedField };
          }
        }
        return field;
      }),
    );
  };

  const addOption = (id: string) => {
    setFields((prevFields: Field[]) =>
      prevFields.map((field: any) => {
        if (field._id === id) {
          return {
            ...field,
            values: [
              ...field?.values,
              {
                label: `Option ${field?.values?.length + 1}`,
                value: `option-${field?.values?.length + 1}`,
                selected: false,
              },
            ],
          };
        }
        return field;
      }),
    );
  };

  const handelPostTemplateProcess = () => {
    if (fields.length > 0) {
      if (isSend) {
        handelSubmitEmail();
      } else {
        setIsTitleModal(true);
      }
    } else {
      enqueueSnackbar('Nothing to post!', {
        variant: 'error',
      });
    }
  };

  const [postEmailTemplate, { isLoading: loadingPostTemplate }] =
    usePostEmailTemplatesMutation();
  const [postEmailWithTemplates, { isLoading: loadingPostEmailTemplate }] =
    usePostEmailWithTemplatesMutation();
  const [updateEmailTemplate, { isLoading: loadingUpdateTemplate }] =
    useUpdateEmailTemplatesMutation();

  const generatedHTML = generateHTML(fields, false);

  const handelPostTemplate = async (values: any) => {
    const payload = {
      name: titleValue,
      data: fields,
    };

    if (isSend) {
      const formDataSend = new FormData();
      formDataSend.append(
        'to',
        autocompleteValues ? autocompleteValues.join(',') : '',
      );
      formDataSend.append('subject', values?.subject);
      formDataSend.append('content', generatedHTML?.toString() || ' ');

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
        await postEmailTemplate({
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

            <Box sx={styles?.contentPaper}>
              <Box ref={drop} sx={styles?.dropZone}>
                {isNullOrEmpty(fields) && (
                  <Box
                    sx={{
                      border: `1px dashed ${theme?.palette?.grey[900]}`,
                      borderRadius: '8px',
                      height: '180px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                      Drag and Drop the content to build your own custom Form
                    </Typography>
                  </Box>
                )}
                {fields.map((field: Field, index: number) => {
                  return (
                    <FormField
                      id={field?._id}
                      key={field?._id}
                      index={index}
                      field={field}
                      onRemove={handleRemove}
                      onChange={handleFieldChange}
                      addOption={addOption}
                      moveField={moveField}
                      source="form"
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box sx={styles?.sideBar}>
            <FormControls />
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
