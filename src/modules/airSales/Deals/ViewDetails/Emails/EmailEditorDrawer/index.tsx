import { Box, Button, Grid, Typography } from '@mui/material';

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
} from './EmailEditorDrawer.data';

import {
  ExclimatoryCircleIcon,
  GmailIcon,
  OutlookIcon,
  SMSIcon,
  TimeClockIcon,
} from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

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
              <Grid item xs={12}>
                <RHFTextField
                  name="fromEmail"
                  label="From"
                  size="small"
                  placeholder="From"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFAutocomplete
                  name="toEmail"
                  label="To"
                  placeholder="To"
                  options={options}
                  multiple
                  freeSolo
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <RHFCheckbox name="cc" label="CC" />
              </Grid>
              <Grid item xs={6}>
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
                <RHFTextField
                  name="subject"
                  label="Subject"
                  required={true}
                  size="small"
                  placeholder={'Write a subject line'}
                />
              </Grid>

              <Grid item md={6}>
                <RHFSelect name="outcomes" label="Outcomes" size="small">
                  {options?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
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
                      You haven’t connected your email to the CRM? <br />
                      Connect it now to keep your conversations synced?
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
                      <GmailIcon width={22} height={22} />
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
                      <OutlookIcon width={22} height={22} />
                      <Typography variant="body2">Microsoft Outlook</Typography>
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
                      <SMSIcon width={22} height={22} />
                      <Typography variant="body2">Others</Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <RHFEditor name="description" label="To" />
              </Grid>
              <Grid item xs={12}>
                <RHFDropZone name="attachFile" label="To" />
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
      <PermissionsGuard
        permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_SCHEDULE_EMAIL]}
      >
        <ScheduleModals
          message={
            "You're about to delete a record. Deleted records can't be restored after 90 days?."
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
      </PermissionsGuard>
    </div>
  );
};

export default EmailEditorDrawer;
