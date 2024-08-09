import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
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
import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import { EMAIL_ENUMS, indexNumbers } from '@/constants';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  emailDefaultValues,
  emailValidationsSchema,
} from './CreateNewEmail.data';
import { useEffect, useState } from 'react';
import { usePostEmailTemplatesMutation } from '@/services/airMarketer/emailMarketing';
import { enqueueSnackbar } from 'notistack';
import { AIR_MARKETER } from '@/routesConstants/paths';

const CreateNewEmail = () => {
  const {
    isAddNoteDrawer,
    handleAddNoteDrawer,
    openCalendar,
    setOpenCalendar,
    router,
    anchorEl,
    handlePopverClick,
    handlePopverClose,
    menuOpen,
    sendAnchorEl,
    handleSendMenuClick,
    handleSendMenuClose,
    sendMenuOpen,
  }: any = useCreateNewEmail();

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

  const [toStateDep, setToStateDep] = useState(1);
  const isToExists = watchEmailsForm[indexNumbers?.TWO];
  useEffect(() => {
    if (isToExists?.length === 0 || isToExists?.length === undefined) {
      null;
    } else {
      setisToValid(false);
    }
  }, [isToExists, toStateDep]);

  const [postEmailTemplate, { isLoading: loadingpostEmailTemplate }] =
    usePostEmailTemplatesMutation();

  const onSubmit = async (values: any) => {
    setToStateDep(toStateDep + 1);
    if (isToExists?.length === 0 || isToExists?.length === undefined) {
      setisToValid(true);
    } else {
      const formDataSend = new FormData();
      formDataSend.append('to', autocompleteValues?.join(', '));
      formDataSend.append('subject', values?.subject);
      formDataSend.append('content', values?.description ?? ' ');
      formDataSend.append('from', values?.from ?? ' ');
      formDataSend.append('status', EMAIL_ENUMS?.SENT);

      if (values?.cc && values?.cc?.length > 0) {
        formDataSend.append('cc', values?.cc);
      }
      if (values?.bcc && values?.bcc?.length > 0) {
        formDataSend.append('bcc', values?.bcc);
      }

      try {
        await postEmailTemplate({
          body: formDataSend,
        })?.unwrap();
        enqueueSnackbar('successfully created ', {
          variant: 'success',
        });

        router.push(`${AIR_MARKETER?.EMAIL_MARKETING}`);

        reset();
      } catch (error: any) {
        enqueueSnackbar('Something went wrong!', {
          variant: 'error',
        });
      }
    }
  };

  return (
    <>
      <Box sx={styles?.createNewEmailWrap}>
        <Typography variant="h4">
          <span style={{ cursor: 'pointer' }} onClick={() => router.back()}>
            <BackArrIcon />
          </span>
          &nbsp; Create New Email
        </Typography>
        <Box>
          <Button variant="contained" onClick={handleAddNoteDrawer}>
            <PlusIcon />
            &nbsp; Add a note
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <FormProvider {...methodsDealsTasks} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={7}>
              <RHFTextField name="from" label="From" size="small" />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={7}>
              <MultiTextField
                label={'To'}
                required={true}
                values={autocompleteValues}
                handleAutocompleteChange={handleAutocompleteChange}
                isValid={isToValid}
                isValidEmails={isValidEmails}
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
                >
                  CC
                </Button>
                <Button
                  size="small"
                  variant={isBccVisible ? 'contained' : 'outlined'}
                  onClick={() => setIsBccVisible(!isBccVisible)}
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
                />
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={12} lg={7}>
              <RHFTextField name="subject" label="Subject" size="small" />
            </Grid>

            <Grid item xs={12}>
              <RHFEditor name="description" label={'Message'} />
            </Grid>
          </Grid>
        </FormProvider>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            className="small"
            color="primary"
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleSendMenuClick}
            classes={{ outlined: 'outlined_btn' }}
            type="button"
          >
            Send
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
              onClick={handleSubmit(onSubmit)}
              sx={{ display: 'flex', gap: '5px' }}
            >
              {loadingpostEmailTemplate && <CircularProgress size={15} />} Send
            </MenuItem>
            <MenuItem>Schedule</MenuItem>
            <MenuItem>Save as Draft</MenuItem>
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
        isMenuOpen={menuOpen}
        handlePopverClick={handlePopverClick}
        handlePopverClose={handlePopverClose}
        anchorEl={anchorEl}
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
}: any) => {
  const theme = useTheme();
  return (
    <Autocomplete
      multiple
      freeSolo
      id="tags-filled"
      options={[]}
      value={values}
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
