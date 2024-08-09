import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useEmailThisDashboard } from './useEmailThisDashboard';
import { LoadingButton } from '@mui/lab';
import { DOWNLOAD_FILE_TYPE } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

const EmailThisDashboard = (props: any) => {
  const { isDrawerOpen, downloadReport, isDownloading } = props;
  const {
    methods,
    sendDashboardViaEmailFormFields,
    sendServiceDashboardViaEmailStatus,
    closeDrawer,
    handleSubmit,
    submitEmail,
    sendServiceDashboardViaEmailOnceStatus,
  } = useEmailThisDashboard(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => closeDrawer?.()}
        title="Email this dashboard"
        submitHandler={() => handleSubmit(submitEmail)()}
        footer
        isOk
        okText="Send"
        isDisabled={
          sendServiceDashboardViaEmailStatus?.isLoading ||
          sendServiceDashboardViaEmailOnceStatus?.isLoading
        }
        isLoading={
          sendServiceDashboardViaEmailStatus?.isLoading ||
          sendServiceDashboardViaEmailOnceStatus?.isLoading
        }
        disabledCancelBtn={
          sendServiceDashboardViaEmailStatus?.isLoading ||
          sendServiceDashboardViaEmailOnceStatus?.isLoading
        }
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {sendDashboardViaEmailFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size="small">
                    {item?.heading ? item?.heading : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD,
          ]}
        >
          <Box display={'flex'} flexWrap={'wrap'} gap={2} my={2}>
            <LoadingButton
              variant="contained"
              disabled={isDownloading?.isLoading}
              onClick={() => downloadReport?.(DOWNLOAD_FILE_TYPE?.PDF)}
              loading={isDownloading?.isPng === DOWNLOAD_FILE_TYPE?.PDF}
            >
              Download as PDF
            </LoadingButton>
            <LoadingButton
              variant="contained"
              disabled={isDownloading?.isLoading}
              loading={isDownloading?.isPng === DOWNLOAD_FILE_TYPE?.PNG}
              onClick={() => downloadReport?.(DOWNLOAD_FILE_TYPE?.PNG)}
            >
              Download as PNG
            </LoadingButton>
          </Box>
        </PermissionsGuard>
      </CommonDrawer>
    </>
  );
};

export default EmailThisDashboard;
