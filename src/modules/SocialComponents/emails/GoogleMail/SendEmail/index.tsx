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
  OutlookIcon,
  SMSIcon,
  TimeClockIcon,
} from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import useSendEmailDrawer from './useSendEmailDrawer';
import { CREATE_EMAIL_TYPES, DATE_TIME_FORMAT } from '@/constants';
import { useAppSelector } from '@/redux/store';
import { styles } from '../../Email.styles';
import CustomLabel from '@/components/CustomLabel';
import * as yup from 'yup';
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';
import { ImageComponent } from '../Chat/RightPane';
import { setCurrentForwardAttachments } from '@/redux/slices/email/gmail/slice';
import { useDispatch } from 'react-redux';

const SendEmailDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, drawerType, emailSettingsData } = props;

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
    loadingReplyGmail,
    loadingForwardGmail,
    loadingDraftGmail,
  } = useSendEmailDrawer({ setOpenDrawer, drawerType, emailSettingsData });

  const isCrmConnected = false;

  const currentGmailAssets = useAppSelector(
    (state: any) => state?.gmail?.currentGmailAssets,
  );

  const CurrentForwardAttachments = useAppSelector(
    (state: any) => state?.gmail?.CurrentForwardAttachments,
  );

  const removeRePrefix = (title: any) => {
    return title?.startsWith('Re: ') ? title?.replace(/^Re: /, '') : title;
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

  const getLoadingDrawerType = () => {
    switch (drawerType) {
      case CREATE_EMAIL_TYPES.NEW_EMAIL:
        return isSendLater ? loadingOtherScheduleSend : loadingOtherSend;
      case CREATE_EMAIL_TYPES.FORWARD:
        return loadingForwardGmail;
      case CREATE_EMAIL_TYPES.REPLY:
        return loadingReplyGmail;
      case CREATE_EMAIL_TYPES.DRAFT:
        return loadingDraftGmail;
      default:
        return '';
    }
  };

  const dispatch = useDispatch();

  const handleRemove = (item: any, attachments: any) => {
    const updatedAttachments = attachments?.filter(
      (attachment: any) => attachment !== item,
    );

    dispatch(
      setCurrentForwardAttachments(
        updatedAttachments?.map((attachment: any) => ({
          base64: attachment?.base64,
          contentType: attachment?.contentType,
          fileName: attachment?.fileName,
        })),
      ),
    );
  };

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
        isLoading={getLoadingDrawerType()}
        okText={isSendLater ? 'Send Later' : 'Send'}
        isOk={true}
        footer={true}
        // footerActionText={isSendLater ? 'Send Now' : 'Send Later'}
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
                    value={currentGmailAssets?.others?.to || ''}
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
              )}
              {drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL && (
                <>
                  <Grid item xs={4}>
                    <RHFCheckbox name="ccChecked" label="CC" />
                  </Grid>
                  <Grid item xs={4}>
                    <RHFCheckbox name="bccChecked" label="BCC" />
                  </Grid>
                </>
              )}

              {watchEmailsForm[0] &&
                drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL && (
                  <Grid item xs={12}>
                    <RHFTextField
                      name="cc"
                      label="CC"
                      size="small"
                      disabled={currentGmailAssets?.others?.Cc}
                    />
                  </Grid>
                )}
              {watchEmailsForm[1] &&
                drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL && (
                  <Grid item xs={12}>
                    <RHFTextField name="bcc" label="BCC" size="small" />
                  </Grid>
                )}
              <Grid item md={6}>
                {drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL ? (
                  <RHFTextField name="subject" label="Subject" size="small" />
                ) : (
                  <RHFTextField
                    name="re"
                    label={
                      drawerType === CREATE_EMAIL_TYPES?.FORWARD
                        ? 'Fwd:'
                        : 'Re:'
                    }
                    size="small"
                    value={removeRePrefix(currentGmailAssets?.others?.subject)}
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
                <RHFEditor
                  name="description"
                  label="Description"
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ marginBottom: '10px' }}>
                  {CurrentForwardAttachments &&
                    CurrentForwardAttachments?.map((item: any) => {
                      return (
                        <Box
                          key={uuidv4()}
                          sx={{
                            marginTop: '10px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            display: 'flex',
                            backgroundColor: theme?.palette?.grey[400],
                            padding: '10px',
                            justifyContent: 'space-between',
                          }}
                        >
                          <ImageComponent
                            base64={item?.base64}
                            contentType={item?.contentType}
                            fileName={item?.fileName}
                          />

                          <Box
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleRemove(item, CurrentForwardAttachments)
                            }
                          >
                            <ClearIcon />
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <RHFDropZone
                  name="attachFile"
                  label="Attachments"
                  multiple
                  maxSize={25 * 1024 * 1024}
                  fileType={'PNG, JPG, PDF, DOC, and CSV (max 25.00 MB)'}
                />
              </Grid>
            </Grid>

            {isSendLater && (
              <Box sx={{ mt: 2 }}>
                <RHFDateTimePicker
                  name="sentDate"
                  fullWidth
                  label="Select Date and Time"
                  size="small"
                />
              </Box>
            )}
          </FormProvider>
          {drawerType != CREATE_EMAIL_TYPES?.NEW_EMAIL && (
            <Box mt={2}>
              <Box
                sx={{
                  borderLeft: `1px solid ${theme?.palette?.grey[500]}`,
                  padding: '5px 0px 5px 20px',
                }}
              >
                <Box>
                  <Typography variant="body3">
                    <strong>From :</strong> {currentGmailAssets?.others?.from}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body3">
                    <strong>Sent :</strong>{' '}
                    {dayjs(currentGmailAssets?.others?.sent).format(
                      DATE_TIME_FORMAT?.MMMDDYYYY,
                    )}
                  </Typography>
                </Box>
                {/* <Box>
                  <Typography variant="body3">
                    <strong>To :</strong>
                    {currentGmailAssets?.others?.to}
                  </Typography>
                </Box> */}
                <Box>
                  <Typography variant="body3">
                    <strong>Subject:</strong>{' '}
                    {currentGmailAssets?.others?.subject}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default SendEmailDrawer;
