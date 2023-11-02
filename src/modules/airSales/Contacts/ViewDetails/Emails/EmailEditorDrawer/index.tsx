import React from 'react';

import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { ScheduleModals } from '@/components/ScheduleModals';

import {
  FormProvider,
  RHFAutocomplete,
  RHFCheckbox,
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import useEmailEditorDrawer from './useEmailEditorDrawer';

import {
  drawerButtonTitle,
  drawerTitle,
  options,
  scheduleEmailDataArray,
  emailsData,
} from './EmailEditorDrawer.data';

import {
  ExclimatoryCircleIcon,
  GmailIcon,
  OutlookIcon,
  SMSIcon,
  TimeClockIcon,
} from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const EmailEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;

  const {
    handleSubmit,
    onSubmit,
    methodsdealsTasks,
    watchEmailsForm,
    theme,
    handleScheduleEmail,
    methodsScheduleEmail,
    onSubmitEmail,
  } = useEmailEditorDrawer();

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer}
        footerActionText="Send Later"
        footerActionTextIcon={<TimeClockIcon />}
        onFooterActionSubmit={() => setOpenDrawer('outcome')}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsdealsTasks}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={3}>
              {/* <Grid item xs={12}>
                <RHFTextField name="fromEmail" label="From" size="small" />
              </Grid> */}
              <Grid item xs={12}>
                <RHFAutocomplete
                  name="toEmail"
                  label="To"
                  options={options}
                  multiple
                  freeSolo
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <RHFCheckbox name="from" label="From" />
              </Grid>
              <Grid item xs={4}>
                <RHFCheckbox name="cc" label="CC" />
              </Grid>
              <Grid item xs={4}>
                <RHFCheckbox name="bcc" label="BCC" />
              </Grid>

              {watchEmailsForm[0] && (
                <Grid item xs={12}>
                  <RHFAutocomplete
                    name="ccEmail"
                    label="CC"
                    options={options}
                    multiple
                    freeSolo
                    size="small"
                  />
                </Grid>
              )}
              {watchEmailsForm[1] && (
                <Grid item xs={12}>
                  <RHFAutocomplete
                    name="bccEmail"
                    label="BCC"
                    options={options}
                    multiple
                    freeSolo
                    size="small"
                  />
                </Grid>
              )}
              <Grid item md={6}>
                {openDrawer !== 'New' ? (
                  <RHFTextField name="re" label="Re:" size="small" />
                ) : (
                  <RHFTextField name="subject" label="Subject" size="small" />
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
              {openDrawer === 'New' && (
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
                        sx={{ color: theme.palette.slateBlue.main }}
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
                          background: theme.palette.common.white,
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
                          background: theme.palette.common.white,
                        }}
                        className="small"
                      >
                        <OutlookIcon />
                        <Typography variant="body2">
                          Microsoft Outlook
                        </Typography>
                      </Button>

                      <Button
                        variant="outlined"
                        sx={{
                          color: 'grey',
                          gap: 0.5,
                          background: theme.palette.common.white,
                        }}
                        className="small"
                      >
                        <SMSIcon />{' '}
                        <Typography variant="body2">Others</Typography>
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}
              <Grid item xs={12}>
                <RHFEditor name="description" label="To" />
              </Grid>
              <Grid item xs={12}>
                <RHFDropZone name="attachFile" label="To" />
              </Grid>
            </Grid>
          </FormProvider>
          {openDrawer !== 'New' && (
            <Box>
              <Card sx={{ padding: '8px 12px', mt: 3 }}>
                <Stack>
                  {emailsData?.map((item: any) => (
                    <Box key={uuidv4()}>
                      <Stack gap={0.5}>
                        <Typography>From: {item?.from}</Typography>
                        <Typography>Sent: {item?.sent}</Typography>
                        <Typography>To: {item?.to}</Typography>
                        <Typography>Subject: {item?.subject}</Typography>
                      </Stack>
                      <Divider sx={{ my: 1 }} />
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Box>
          )}
        </Box>
      </CommonDrawer>
      <ScheduleModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        submitButonText="Schedule"
        type={'outcome'}
        open={openDrawer === 'outcome'}
        handleClose={() => setOpenDrawer('')}
        handleSubmit={() => {}}
        isFooter={true}
      >
        <FormProvider
          methods={methodsScheduleEmail}
          onSubmit={handleScheduleEmail(onSubmitEmail)}
        >
          <Grid container spacing={5}>
            {scheduleEmailDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
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

export default EmailEditorDrawer;
