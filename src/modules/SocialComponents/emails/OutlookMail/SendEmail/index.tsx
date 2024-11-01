import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';

import { ClearIcon, InfoBlueIcon, TimeClockIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import useSendEmailDrawer from './useSendEmailDrawer';
import {
  CREATE_EMAIL_TYPES,
  DATE_TIME_FORMAT,
  indexNumbers,
} from '@/constants';
import { useAppSelector } from '@/redux/store';
import { styles } from '../../Email.styles';
import CustomLabel from '@/components/CustomLabel';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setCurrentForwardAttachments } from '@/redux/slices/email/outlook/slice';
import dayjs from 'dayjs';
import { useLazyGetEmailTemplatesAsyncQuery } from '@/services/airMarketer/emailTemplates';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { ImageComponentAttachment } from '../Chat/RightPane';
import { ScheduleModals } from '@/components/ScheduleModals';
import { scheduleEmailDataArray } from './SendEmailDrawer.data';

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
    setAutocompleteValues,
    autocompleteValues,

    setAutocompleteCCValues,
    autocompleteCCValues,

    setAutocompleteBCCValues,
    autocompleteBCCValues,

    isToValid,
    isLoadingForward,
    loadingOtherReply,

    setIsReplaceTemplate,
    isReplaceTemplate,
    handleUseTemplate,

    methodsScheduleEmail,
    handleScheduleEmail,
    onSubmitEmail,

    setIsScheduleDrawerOpen,
    isScheduleDrawerOpen,
    scheduleReset,
    isScheduleExists,
  } = useSendEmailDrawer({ setOpenDrawer, drawerType, emailSettingsData });

  const dispatch = useDispatch();
  const currentEmailAssets = useAppSelector(
    (state: any) => state?.outlook?.currentEmailAssets,
  );
  const currentForwardAttachments = useAppSelector(
    (state: any) => state?.outlook?.currentForwardAttachments,
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

  const handleRemove = (item: any, attachments: any) => {
    const updatedAttachments = attachments?.filter(
      (attachment: any) => attachment !== item,
    );
    dispatch(
      setCurrentForwardAttachments(
        updatedAttachments?.map((attachment: any) => ({
          contentBytes: attachment?.contentBytes,
          contentType: attachment?.contentType,
          name: attachment?.name,
        })),
      ),
    );
  };

  const apiQueryUsers = useLazyGetEmailTemplatesAsyncQuery?.();

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
              return 'Reply';
            default:
              return '';
          }
        })()}
        isLoading={(() => {
          switch (drawerType) {
            case CREATE_EMAIL_TYPES?.NEW_EMAIL:
              return loadingOtherSend;
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
        okText={isScheduleExists ? 'Schedule' : 'Send'}
        isOk={true}
        footer={true}
        {...(drawerType === CREATE_EMAIL_TYPES?.NEW_EMAIL && {
          footerActionText: 'Send Later',
        })}
        footerActionTextIcon={<TimeClockIcon />}
        submitHandler={handleSubmit(onSubmit)}
        onFooterActionSubmit={() => setIsScheduleDrawerOpen(true)}
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
              <Grid item xs={12}>
                <MultiTextField
                  label={'To'}
                  required={true}
                  values={autocompleteValues}
                  handleAutocompleteChange={handleAutocompleteChange}
                  isValid={isToValid}
                  isValidEmails={isValidEmails}
                />
              </Grid>
              <Grid item xs={4}>
                <RHFCheckbox name="ccChecked" label="CC" />
              </Grid>
              <Grid item xs={4}>
                <RHFCheckbox name="bccChecked" label="BCC" />
              </Grid>
              {watchEmailsForm[indexNumbers?.ZERO] && (
                <Grid item xs={12}>
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
              {watchEmailsForm[indexNumbers?.ONE] && (
                <Grid item xs={12}>
                  {/* <RHFTextField name="bcc" label="BCC" size="small" /> */}
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
                <RHFAutocompleteAsync
                  label="Template"
                  name="template"
                  fullWidth
                  apiQuery={apiQueryUsers}
                  size="small"
                  placeholder="Select email"
                  getOptionLabel={(option: any) => option?.name}
                />
              </Grid>

              <Grid item xs={12}>
                <RHFEditor
                  name="description"
                  label={
                    drawerType === CREATE_EMAIL_TYPES?.REPLY ||
                    drawerType === CREATE_EMAIL_TYPES?.REPLY_ALL
                      ? 'Comment'
                      : 'Description'
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ marginBottom: '10px' }}>
                  {currentForwardAttachments &&
                    currentForwardAttachments?.map((item: any) => {
                      return (
                        <Box
                          key={uuidv4()}
                          sx={{
                            marginTop: '10px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            display: 'flex',
                            backgroundColor: '#f3f4f6',
                            padding: '10px',
                            justifyContent: 'space-between',
                          }}
                        >
                          <ImageComponentAttachment
                            base64={item?.contentBytes}
                            contentType={item?.contentType}
                            fileName={item?.name}
                          />
                          <Box
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleRemove(item, currentForwardAttachments)
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
                  name="attachments"
                  label="Attachments"
                  multiple
                  maxSize={25 * 1024 * 1024}
                  fileType={'PNG, JPG, PDF, DOC, and CSV (max 25.00 MB)'}
                />
              </Grid>
            </Grid>
          </FormProvider>
          {drawerType === CREATE_EMAIL_TYPES?.FORWARD && (
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
                    <>
                      {dayjs(currentEmailAssets?.others?.sent)?.format(
                        DATE_TIME_FORMAT?.DMYhmma,
                      )}
                    </>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body3">
                    <strong>To : </strong>
                    {Array.isArray(currentEmailAssets?.others?.to)
                      ? currentEmailAssets.others.to.join(', ')
                      : ''}
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
          )}
        </Box>

        <AlertModals
          type={ALERT_MODALS_TYPE?.INFO}
          open={isReplaceTemplate}
          handleClose={() => setIsReplaceTemplate(false)}
          handleSubmitBtn={handleUseTemplate}
          message="Are you sure you want to replace changes with email template?"
        />
      </CommonDrawer>

      <ScheduleModals
        submitButonText="Schedule"
        type={'schedule'}
        open={isScheduleDrawerOpen}
        handleClose={() => {
          setIsScheduleDrawerOpen(false);
          scheduleReset();
        }}
        handleSubmit={handleScheduleEmail(onSubmitEmail)}
        isFooter={true}
        loading={loadingOtherScheduleSend}
      >
        <FormProvider
          methods={methodsScheduleEmail}
          onSubmit={handleScheduleEmail(onSubmitEmail)}
        >
          <Grid container spacing={5}>
            {scheduleEmailDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </ScheduleModals>
    </div>
  );
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

export default SendEmailDrawer;
