import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useCreateNewEmail } from './useCreateNewEmail';
import AddANote from './AddNote';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { BackArrIcon, InfoBlueIcon, PlusIcon } from '@/assets/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import CustomLabel from '@/components/CustomLabel';
import {
  RHFDateTimePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { DATE_TIME_FORMAT, EMAIL_ENUMS, indexNumbers } from '@/constants';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  emailDefaultValues,
  emailValidationsSchema,
} from './CreateNewEmail.data';
import { useEffect, useState } from 'react';
import {
  useDeleteEmailMarketingMutation,
  usePostEmailTemplatesMutation,
} from '@/services/airMarketer/emailMarketing';
import { enqueueSnackbar } from 'notistack';
import { AIR_MARKETER } from '@/routesConstants/paths';
import dayjs from 'dayjs';
import { useGetEmailSettingsIdentitiesQuery } from '@/services/airMarketer/email-settings';
import { useRouter } from 'next/router';
import { getSession } from '@/utils';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { convertTimezone } from '@/utils/dateTime';

// Load plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const CreateNewEmail = ({ edit, data, setIsEditEmailOpen }: any) => {
  const router = useRouter();

  const {
    isAddNoteDrawer,
    handleAddNoteDrawer,
    openCalendar,
    setOpenCalendar,
    sendAnchorEl,
    handleSendMenuClick,
    handleSendMenuClose,
    sendMenuOpen,
  }: any = useCreateNewEmail();

  const theme = useTheme();

  const { folder, id } = router.query;

  const { user }: any = getSession();

  const [notesData, setNotesData] = useState<any>([]);
  const [isCcVisible, setIsCcVisible] = useState(false);
  const [isBccVisible, setIsBccVisible] = useState(false);

  const [autocompleteValues, setAutocompleteValues] = useState<string[]>([]);
  const [autocompleteCCValues, setAutocompleteCCValues] = useState<string[]>(
    [],
  );
  const [autocompleteBCCValues, setAutocompleteBCCValues] = useState<string[]>(
    [],
  );

  const handleAutocompleteChange = (_: any, newValue: string[]) => {
    setAutocompleteValues(newValue);
  };
  const handleAutocompleteCCChange = (_: any, newValue: string[]) => {
    setAutocompleteCCValues(newValue);
  };
  const handleAutocompleteBCCChange = (_: any, newValue: string[]) => {
    setAutocompleteBCCValues(newValue);
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
  const isValidCCEmails = checkEmails(autocompleteCCValues);
  const isValidBCCEmails = checkEmails(autocompleteBCCValues);

  const [isToValid, setisToValid] = useState(false);

  const methodsDealsTasks: any = useForm({
    resolver: yupResolver(emailValidationsSchema()),
    defaultValues: emailDefaultValues,
  });

  const { handleSubmit, watch, reset, setValue } = methodsDealsTasks;

  useEffect(() => {
    setValue('to', autocompleteValues);
  }, [autocompleteValues]);
  useEffect(() => {
    setValue('cc', autocompleteCCValues);
  }, [autocompleteCCValues]);
  useEffect(() => {
    setValue('bcc', autocompleteBCCValues);
  }, [autocompleteBCCValues]);

  const watchEmailsForm = watch([
    'ccChecked',
    'bccChecked',
    'to',
    'sentDate',
    'subject',
    'attachments',
  ]);

  useEffect(() => {
    if (edit) {
      if (data?.data) {
        setValue('from', data?.data?.from);
        setAutocompleteValues(data?.data?.to);
        setValue('subject', data?.data?.subject);
        setValue('description', data?.data?.message);
      }
    }
  }, [data?.data]);

  const [toStateDep, setToStateDep] = useState(1);
  const isToExists = watchEmailsForm[indexNumbers?.TWO];

  const [isSendLater, setIsSendLater] = useState(false);
  const [dateAndTimeModal, setDateAndTimeModal] = useState(true);

  const [sendLaterDate, setSendLaterDate] = useState<string | null>(null);
  const [submitedDateVal, setSubmitedDateVal] = useState<string | null>(null);

  const dateObject = watchEmailsForm[3] && new Date(watchEmailsForm[3]);

  const isoString = dayjs(dateObject)?.format(DATE_TIME_FORMAT?.YYMMDD);

  useEffect(() => {
    if (isSendLater) {
      if (isoString) {
        setSendLaterDate(isoString);
      }
    }
  }, [isoString]);

  useEffect(() => {
    if (isToExists?.length === 0 || isToExists?.length === undefined) {
      null;
    } else {
      setisToValid(false);
    }
  }, [isToExists, toStateDep]);

  const [postEmailTemplate, { isLoading: loadingpostEmailTemplate }] =
    usePostEmailTemplatesMutation();

  const [deleteEmailTemplate] = useDeleteEmailMarketingMutation();

  const fromZone = user?.timezone;
  const toZone = process?.env?.NEXT_PUBLIC_TIME_ZONE;

  const onSubmit = async (values: any, status: any): Promise<void> => {
    setToStateDep(toStateDep + 1);

    if (isToExists?.length === 0 || isToExists?.length === undefined) {
      setisToValid(true);
    } else {
      const formDataSend = new FormData();
      formDataSend.append('to', autocompleteValues?.join(', '));
      formDataSend.append('subject', values?.subject);
      formDataSend.append(
        'content',
        values?.description
          ? `<div>${values?.description} </br> 
          </div>`
          : ' ',
      );
      formDataSend.append('from', values?.from ?? ' ');
      formDataSend.append('status', status ? status : EMAIL_ENUMS?.SCHEDULED);
      if (values?.cc && values?.cc?.length > 0) {
        formDataSend.append('cc', values?.cc);
      }
      if (values?.bcc && values?.bcc?.length > 0) {
        formDataSend.append('bcc', values?.bcc);
      }
      if (sendLaterDate) {
        const convertedDate = convertTimezone(sendLaterDate, fromZone, toZone);
        formDataSend.append('sentOn', convertedDate);
      }
      if (id) {
        formDataSend.append('folderId', String(id));
      }
      if (notesData.length > 0) {
        const mappedData = notesData?.map(
          ({ message, createdBy, uuid }: any) => ({
            message,
            createdBy,
            uuid,
          }),
        );
        const notesDataJson = JSON.stringify(mappedData);
        formDataSend.append('notes', notesDataJson);
      }

      try {
        await postEmailTemplate({
          body: formDataSend,
        })?.unwrap();
        enqueueSnackbar('Successfully created ', {
          variant: 'success',
        });

        if (edit) {
          if (data?.data?.status === EMAIL_ENUMS?.DRAFT) {
            if (data?.data?._id) {
              try {
                await deleteEmailTemplate({
                  ids: [data?.data?._id],
                })?.unwrap();
              } catch (error: any) {
                enqueueSnackbar('Something went wrong !', { variant: 'error' });
              }
            }
          }
        }
        reset();
        if (edit) {
          setIsEditEmailOpen(false);
        }
        setIsSendLater(false);
        router.push(
          id
            ? `${AIR_MARKETER?.EMAIL_FOLDER_EMAILS}?folder=${folder}&id=${id}`
            : `${AIR_MARKETER?.EMAIL_MARKETING}`,
        );
      } catch (error: any) {
        enqueueSnackbar('Something went wrong!', {
          variant: 'error',
        });
      }
    }
  };

  useEffect(() => {
    if (submitedDateVal) {
      handleSubmit(onSubmit)();
    }
  }, [submitedDateVal]);

  const handelSchedule = () => {
    if (submitedDateVal) {
      handleSubmit(onSubmit)(EMAIL_ENUMS?.SCHEDULED);
    } else {
      setIsSendLater(true);
      setDateAndTimeModal(true);
    }
  };

  const { data: emailsRecords, isLoading } = useGetEmailSettingsIdentitiesQuery(
    {
      params: {
        page: 1,
        limit: '1000',
        status: 'VERIFIED',
      },
    },
  );

  return (
    <>
      <Box sx={styles?.createNewEmailWrap}>
        <Typography variant="h4">
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (edit) {
                setIsEditEmailOpen(false);
              } else {
                router.push('/air-marketer/email-marketing');
              }
            }}
          >
            <BackArrIcon />
          </span>
          &nbsp;&nbsp; {edit ? 'Edit Details' : 'Create New Email'}
        </Typography>
        <Box>
          <Button variant="contained" onClick={handleAddNoteDrawer}>
            <PlusIcon />
            &nbsp; Add a note
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 3,
          ...(edit && {
            paddingBottom: '60px',
          }),
        }}
      >
        <FormProvider {...methodsDealsTasks} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {isLoading ? (
              <Grid item xs={12} sm={12} md={12} lg={7}>
                <Skeleton
                  variant="rounded"
                  sx={{ height: '20px', width: '30%' }}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ height: '45px', marginTop: '10px' }}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={7}>
                <RHFSelect
                  name="from"
                  label="From"
                  select={true}
                  size="small"
                  required={true}
                  disabled={
                    edit ? data?.data?.status !== EMAIL_ENUMS?.DRAFT : false
                  }
                >
                  {emailsRecords?.data?.emailIdentitiesSES.map((item: any) => (
                    <option key={item?.id} value={item?.email}>
                      {item?.email}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={12} lg={7}>
              <MultiTextField
                label={'To'}
                required={true}
                values={autocompleteValues}
                handleAutocompleteChange={handleAutocompleteChange}
                isValid={isToValid}
                isValidEmails={isValidEmails}
                disabled={
                  edit ? data?.data?.status !== EMAIL_ENUMS?.DRAFT : false
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  height: '70px',
                  mt: '13px',
                  gap: '10px',
                }}
              >
                <Button
                  size="small"
                  variant={isCcVisible ? 'contained' : 'outlined'}
                  onClick={() => setIsCcVisible(!isCcVisible)}
                  disabled={
                    edit ? data?.data?.status !== EMAIL_ENUMS?.DRAFT : false
                  }
                >
                  CC
                </Button>
                <Button
                  size="small"
                  variant={isBccVisible ? 'contained' : 'outlined'}
                  onClick={() => setIsBccVisible(!isBccVisible)}
                  disabled={
                    edit ? data?.data?.status !== EMAIL_ENUMS?.DRAFT : false
                  }
                >
                  BCC
                </Button>
              </Box>
            </Grid>

            {isCcVisible && (
              <Grid item xs={12} sm={12} md={12} lg={7}>
                <MultiTextField
                  label={'CC'}
                  required={false}
                  values={autocompleteCCValues}
                  handleAutocompleteChange={handleAutocompleteCCChange}
                  isValid={false}
                  isValidEmails={isValidCCEmails}
                  disabled={
                    edit ? data?.data?.status !== EMAIL_ENUMS?.DRAFT : false
                  }
                />
              </Grid>
            )}

            {isBccVisible && (
              <Grid item xs={12} sm={12} md={12} lg={7}>
                <MultiTextField
                  label={'BCC'}
                  required={false}
                  values={autocompleteBCCValues}
                  handleAutocompleteChange={handleAutocompleteBCCChange}
                  isValid={false}
                  isValidEmails={isValidBCCEmails}
                  disabled={
                    edit ? data?.data?.status !== EMAIL_ENUMS?.DRAFT : false
                  }
                />
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={12} lg={7}>
              <RHFTextField
                name="subject"
                label="Subject"
                size="small"
                required={true}
                disabled={
                  edit ? data?.data?.status !== EMAIL_ENUMS?.DRAFT : false
                }
              />
            </Grid>

            <Grid item xs={12}>
              <RHFEditor
                name="description"
                label={'Message'}
                placeholder="Enter Email Text"
                disabled={
                  edit ? data?.data?.status !== EMAIL_ENUMS?.DRAFT : false
                }
                toolbar={{
                  container: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ align: [] }],
                    [{ color: [] }, { background: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                  ],
                }}
              />
            </Grid>
            {isSendLater && (
              <Grid item xs={12}>
                <RHFDateTimePicker
                  name="sentDate"
                  fullWidth
                  label="Select Date and Time"
                  size="small"
                  disablePast
                  minDateTime={dayjs()}
                  clearable={true}
                  onAccept={() => {
                    setSubmitedDateVal(sendLaterDate);
                    setDateAndTimeModal(false);
                  }}
                  okText="Schedule"
                  open={dateAndTimeModal}
                />
              </Grid>
            )}
          </Grid>
        </FormProvider>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
            ...(edit && {
              position: 'fixed',
              bottom: '0px',
              left: '0',
              width: '100%',
              background: theme?.palette?.common?.white,
              padding: '20px 20px',
            }),
          }}
        >
          <Button
            className="small"
            color="primary"
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            disabled={edit ? data?.data?.status !== EMAIL_ENUMS?.DRAFT : false}
            onClick={handleSendMenuClick}
            classes={{ outlined: 'outlined_btn' }}
            type="button"
          >
            {loadingpostEmailTemplate && <CircularProgress size={15} />} Send
          </Button>
          <Menu
            anchorEl={sendAnchorEl}
            open={sendMenuOpen}
            onClose={handleSendMenuClose}
            PaperProps={{
              style: {
                width: '112px',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleSubmit(onSubmit)(EMAIL_ENUMS?.SENT);
                handleSendMenuClose();
              }}
              sx={{ display: 'flex', gap: '5px' }}
            >
              Send
            </MenuItem>
            <MenuItem
              onClick={() => {
                handelSchedule();
                handleSendMenuClose;
              }}
            >
              {' '}
              Schedule
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleSubmit(onSubmit)(EMAIL_ENUMS?.DRAFT);
                handleSendMenuClose;
              }}
            >
              Save as Draft
            </MenuItem>
          </Menu>
          {openCalendar && (
            <SwitchableDatepicker
              placement="right"
              isCalendarOpen={openCalendar}
              setIsCalendarOpen={setOpenCalendar}
            />
          )}
        </Box>
      </Box>

      <AddANote
        isDrawerOpen={isAddNoteDrawer}
        onClose={handleAddNoteDrawer}
        edit={edit}
        notesData={notesData}
        setNotesData={setNotesData}
        notesDataArray={data?.data}
      />
    </>
  );
};

export default CreateNewEmail;

const styles = {
  createNewEmailWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

const MultiTextField = ({
  values,
  handleAutocompleteChange,
  isValid,
  isValidEmails,
  label,
  required,
  disabled,
}: any) => {
  const theme = useTheme();
  return (
    <Autocomplete
      multiple
      freeSolo
      id="tags-filled"
      options={[]}
      value={values}
      disabled={disabled}
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
          <CustomLabel label={label} required={required} />
          <TextField
            {...params}
            variant="outlined"
            placeholder="Enter email"
            size="small"
            error={isValid}
            helperText={
              <>
                {isValid ? (
                  <>
                    <Typography
                      component={'span'}
                      sx={{ display: 'block', mt: -1, ml: -1 }}
                    >
                      Field is Required
                    </Typography>
                  </>
                ) : (
                  <>
                    {isValidEmails ? (
                      params.inputProps?.value?.length > 1 ? (
                        <Typography
                          fontSize={13}
                          color={theme?.palette?.custom?.dodger_blue}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <InfoBlueIcon size={'16'} /> Press enter to add email
                        </Typography>
                      ) : null
                    ) : (
                      <Typography color={theme?.palette?.error?.main}>
                        Email you entered is not valid
                      </Typography>
                    )}
                  </>
                )}
              </>
            }
          />
        </>
      )}
    />
  );
};
