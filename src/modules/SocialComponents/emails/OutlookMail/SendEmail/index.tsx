import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFCheckbox,
  RHFDateTimePicker,
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { options } from './SendEmailDrawer.data';

import {
  ExclimatoryCircleIcon,
  GmailIcon,
  InfoBlueIcon,
  OutlookIcon,
  SMSIcon,
  TimeClockIcon,
} from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import useSendEmailDrawer from './useSendEmailDrawer';
import { CREATE_EMAIL_TYPES } from '@/constants';
import { useAppSelector } from '@/redux/store';
import { UnixDateFormatter } from '@/utils/dateTime';
import { styles } from '../../Email.styles';
import CustomLabel from '@/components/CustomLabel';
import * as yup from 'yup';

const SendEmailDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, drawerType } = props;

  const {
    handleSubmit,
    onSubmit,
    methodsDealsTasks,
    watchEmailsForm,
    theme,
    loadingOtherSend,
    loadingOtherScheduleSend,
    isLoadingProcessDraft,
    handleOnClose,
    isSendLater,
    handelSendLaterAction,
    setAutocompleteValues,
    autocompleteValues,
    isToValid,
    isLoadingForward,
    loadingOtherReply,
  } = useSendEmailDrawer({ setOpenDrawer, drawerType });

  const isCrmConnected = false;
  const currentEmailAssets = useAppSelector(
    (state: any) => state?.outlook?.currentEmailAssets,
  );
  const removeRePrefix = (title: any) => {
    return title?.startsWith('Re: ') ? title?.replace(/^Re: /, '') : title;
  };
  const removeFwPrefix = (title: any) => {
    return title?.startsWith('Fw: ') ? title?.replace(/^Fw: /, '') : title;
  };
  const handleAutocompleteChange = (_: any, newValue: string[]) => {
    setAutocompleteValues(newValue);
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

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={handleOnClose}
        title={(() => {
          if (!drawerType) {
            return '';
          }
          switch (drawerType) {
            case CREATE_EMAIL_TYPES?.NEW_EMAIL:
              return 'New Email';
            case CREATE_EMAIL_TYPES?.FORWARD:
              return 'Forward';
            case CREATE_EMAIL_TYPES?.REPLY:
              return 'Reply';
            case CREATE_EMAIL_TYPES?.REPLY_ALL:
              return 'Reply all';
            default:
              return '';
          }
        })()}
        isLoading={(() => {
          switch (drawerType) {
            case CREATE_EMAIL_TYPES?.NEW_EMAIL:
              return isSendLater ? loadingOtherScheduleSend : loadingOtherSend;
            case CREATE_EMAIL_TYPES?.FORWARD:
              return isLoadingForward;
            case CREATE_EMAIL_TYPES?.REPLY:
              return loadingOtherReply;
            case CREATE_EMAIL_TYPES?.REPLY_ALL:
              return loadingOtherReply;
            default:
              return false;
          }
        })()}
        okText={isSendLater ? 'Send Later' : 'Send'}
        isOk={true}
        footer={true}
        footerActionText={isSendLater ? 'Send Now' : 'Send Later'}
        footerActionTextIcon={<TimeClockIcon />}
        submitHandler={handleSubmit(onSubmit)}
        onFooterActionSubmit={handelSendLaterAction}
      >
        {isLoadingProcessDraft && (
          <Box sx={styles?.overlayWrapper(theme)}>
            <CircularProgress size={20} />
            <Typography variant="body1">Saving Draft</Typography>
          </Box>
        )}
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsDealsTasks}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              {drawerType === CREATE_EMAIL_TYPES?.REPLY ||
              drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL ? (
                <Grid item xs={12}>
                  <RHFTextField
                    name="to"
                    label="to"
                    size="small"
                    required={false}
                    disabled
                    value={currentEmailAssets?.from || ''}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
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
                          error={isToValid}
                          helperText={
                            <>
                              {isToValid ? (
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
                                        color={
                                          theme?.palette?.custom?.dodger_blue
                                        }
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '5px',
                                        }}
                                      >
                                        <InfoBlueIcon size={'16'} /> Press enter
                                        to add email
                                      </Typography>
                                    ) : null
                                  ) : (
                                    <Typography
                                      color={theme?.palette?.error?.main}
                                    >
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
                </Grid>
              )}
              <Grid item xs={4}>
                <RHFCheckbox name="ccChecked" label="CC" />
              </Grid>
              <Grid item xs={4}>
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
              <Grid item md={6}>
                {drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL && (
                  <RHFTextField
                    name="subject"
                    label="Subject"
                    size="small"
                    required={drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL}
                  />
                )}

                {(drawerType === CREATE_EMAIL_TYPES?.REPLY ||
                  drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL) && (
                  <RHFTextField
                    name="re"
                    label="Re:"
                    size="small"
                    value={removeRePrefix(currentEmailAssets?.others?.subject)}
                    disabled
                  />
                )}
                {drawerType === CREATE_EMAIL_TYPES?.FORWARD && (
                  <RHFTextField
                    name="re"
                    label="FWD:"
                    size="small"
                    value={removeFwPrefix(currentEmailAssets?.others?.subject)}
                    disabled
                  />
                )}
              </Grid>

              <Grid item md={6}>
                <RHFSelect name="template" label="Template" size="small">
                  {options?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              {isCrmConnected && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      background: theme?.palette?.custom?.pastel_yellow,
                      borderRadius: '6px',
                      padding: '12px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                        marginBottom: '5px',
                      }}
                    >
                      <Box>
                        <ExclimatoryCircleIcon />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme?.palette?.slateBlue?.main }}
                      >
                        You haven’t connected your email to the CRM. Connect it
                        now to keep your conversations synced.
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        gap: 1,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          color: 'grey',
                          gap: 0.5,
                          background: theme?.palette?.common?.white,
                        }}
                        className="small"
                      >
                        <GmailIcon width={'18'} />{' '}
                        <Typography variant="body2">Gmail</Typography>
                      </Button>

                      <Button
                        variant="outlined"
                        sx={{
                          color: 'grey',
                          gap: 0.5,
                          background: theme?.palette?.common?.white,
                          whiteSpace: 'nowrap',
                        }}
                        className="small"
                      >
                        <OutlookIcon width={'22'} />
                        <Typography variant="body2">
                          Microsoft Outlook
                        </Typography>
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          color: 'grey',
                          gap: 0.5,
                          background: theme?.palette?.common?.white,
                        }}
                        className="small"
                      >
                        <SMSIcon width={'18'} />{' '}
                        <Typography variant="body2">Others</Typography>
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}
              <Grid item xs={12}>
                <RHFEditor name="description" label="Description" />
              </Grid>
              <Grid item xs={12}>
                <RHFDropZone name="attachments" label="Attachments" />
              </Grid>
            </Grid>

            {isSendLater && (
              <Box sx={{ mt: 2 }}>
                <RHFDateTimePicker
                  name="sentDate"
                  fullWidth
                  label="Select Data and Time"
                  size="small"
                />
              </Box>
            )}
          </FormProvider>
          <Box mt={2}>
            <Box
              sx={{
                borderLeft: `1px solid ${theme?.palette?.grey[500]}`,
                padding: '5px 0px 5px 20px',
              }}
            >
              <Box>
                <Typography variant="body3">
                  <strong>From :</strong> {currentEmailAssets?.others?.from}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body3">
                  <strong>Sent :</strong>{' '}
                  <UnixDateFormatter
                    timestamp={currentEmailAssets?.others?.sent}
                    timeZone="Asia/Karachi"
                  ></UnixDateFormatter>
                </Typography>
              </Box>
              <Box>
                <Typography variant="body3">
                  <strong>To :</strong>
                  {currentEmailAssets?.others?.to}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body3">
                  <strong>Subject:</strong>{' '}
                  {currentEmailAssets?.others?.subject}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default SendEmailDrawer;
