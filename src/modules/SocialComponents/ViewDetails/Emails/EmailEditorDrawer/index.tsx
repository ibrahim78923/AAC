import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFCheckbox,
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import useEmailEditorDrawer from './useEmailEditorDrawer';

import { drawerButtonTitle, options } from './EmailEditorDrawer.data';

import {
  ExclimatoryCircleIcon,
  GmailIcon,
  OutlookIcon,
  SMSIcon,
} from '@/assets/icons';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { CREATE_EMAIL_TYPES } from '@/constants';
import CustomLabel from '@/components/CustomLabel';

const EmailEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, companyId } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsdealsTasks,
    watchEmailsForm,
    theme,
    autocompleteValues,
    setAutocompleteValues,
    isLoadingSend,
  } = useEmailEditorDrawer(setOpenDrawer, companyId);

  const handleAutocompleteChange = (_: any, newValue: string[]) => {
    setAutocompleteValues(newValue);
  };
  const isCrmConnected = false;

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

  // const removeRePrefix = (title: any) => {
  //   return title?.startsWith('Re: ') ? title?.replace(/^Re: /, '') : title;
  // };

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={(() => {
          if (!openDrawer) {
            return '';
          }
          switch (openDrawer) {
            case CREATE_EMAIL_TYPES?.NEW_EMAIL:
              return 'New Email';
            case CREATE_EMAIL_TYPES?.FORWARD:
              return 'Forward';
            case CREATE_EMAIL_TYPES?.REPLY:
              return 'Reply';
            default:
              return '';
          }
        })()}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer}
        submitHandler={handleSubmit(onSubmit)}
        isLoading={isLoadingSend}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsdealsTasks}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              {openDrawer === CREATE_EMAIL_TYPES?.REPLY ||
              openDrawer === CREATE_EMAIL_TYPES?.REPLY_ALL ? (
                <Grid item xs={12}>
                  <RHFTextField
                    name="to"
                    label="to"
                    size="small"
                    required={false}
                    disabled
                    // value={
                    //   currentGmailAssets?.others?.to?.includes(loggedInEmail)
                    //     ? currentGmailAssets?.others?.from
                    //     : currentGmailAssets?.others?.to || ''
                    // }
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
              {openDrawer === CREATE_EMAIL_TYPES?.REPLY_ALL ||
                (openDrawer === CREATE_EMAIL_TYPES?.NEW_EMAIL && (
                  <>
                    <Grid item xs={4}>
                      <RHFCheckbox name="ccChecked" label="CC" />
                    </Grid>
                    <Grid item xs={4}>
                      <RHFCheckbox name="bccChecked" label="BCC" />
                    </Grid>
                  </>
                ))}

              {watchEmailsForm[0] &&
                (openDrawer === CREATE_EMAIL_TYPES?.REPLY_ALL ||
                  openDrawer === CREATE_EMAIL_TYPES?.NEW_EMAIL) && (
                  <Grid item xs={12}>
                    <RHFTextField
                      name="cc"
                      label="CC"
                      size="small"
                      // disabled={currentGmailAssets?.others?.Cc}
                    />
                  </Grid>
                )}
              {watchEmailsForm[1] &&
                (openDrawer === CREATE_EMAIL_TYPES?.REPLY_ALL ||
                  openDrawer === CREATE_EMAIL_TYPES?.NEW_EMAIL) && (
                  <Grid item xs={12}>
                    <RHFTextField name="bcc" label="BCC" size="small" />
                  </Grid>
                )}
              <Grid item md={6}>
                {openDrawer === CREATE_EMAIL_TYPES?.NEW_EMAIL ? (
                  <RHFTextField name="subject" label="Subject" size="small" />
                ) : (
                  <RHFTextField
                    name="re"
                    label={
                      openDrawer === CREATE_EMAIL_TYPES?.FORWARD
                        ? 'Fwd:'
                        : 'Re:'
                    }
                    size="small"
                    // value={removeRePrefix(currentGmailAssets?.others?.subject)}
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
                <Box
                  sx={{
                    background: '#FFF6D9',
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
                      <GmailIcon />{' '}
                      <Typography variant="body2">Gmail</Typography>
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
                      <OutlookIcon />
                      <Typography variant="body2">Microsoft Outlook</Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <RHFEditor
                  name="description"
                  label="Description"
                  required={true}
                />
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
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default EmailEditorDrawer;
