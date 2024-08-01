import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { SingleDashboard } from './SingleDashboard';
import { useDashboard } from './useDashboard';
import EmailThisDashboard from './EmailThisDashboard';
import { Box, Button, Chip, Skeleton, Typography } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { truncateText } from '@/utils/avatarUtils';
import { AIR_SERVICES } from '@/constants';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import { Permissions } from '@/constants/permissions';

const Dashboard = () => {
  const {
    dashboardId,
    setDashboardId,
    apiLoader,
    setApiLoader,
    dashboardDropdownActions,
    router,
    isDrawerOpen,
    setIsDrawerOpen,
    user,
    downloadRef,
    downloadReport,
    isDownloading,
    methods,
    apiQueryDashboardList,
  } = useDashboard();

  return (
    <Box>
      {apiLoader?.isLoading || apiLoader?.isFetching ? (
        <Skeleton />
      ) : (
        <Typography variant="h3" color="primary.main">
          {`${truncateText(apiLoader?.data?.data?.dashboard?.name, 30)}` ??
            '---'}
        </Typography>
      )}
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
        mt={1}
      >
        <Typography variant="h4" fontWeight={500} color="blue.main">
          <Typography component="span" variant="h4">
            Hi {user?.firstName ?? '---'}!
          </Typography>{' '}
          Happy to See You again
        </Typography>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD,
              AIR_SERVICES_DASHBOARD_PERMISSIONS?.SHARE_DASHBOARD,
            ]}
          >
            <SingleDropdownButton
              dropdownOptions={dashboardDropdownActions}
              dropdownName="Actions"
              disabled={apiLoader?.isLoading || apiLoader?.isFetching}
              color="inherit"
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
          >
            <FormProvider methods={methods}>
              <RHFAutocompleteAsync
                disabled={apiLoader?.isLoading || apiLoader?.isFetching}
                name="dashboardId"
                size="small"
                sx={{
                  minWidth: pxToRem(230),
                  '.MuiInputBase-input': {
                    padding: `${pxToRem(5)} !important`,
                  },
                  '.MuiFormHelperText-root': {
                    display: 'none',
                  },
                }}
                fullWidth
                placeholder="Dashboards"
                apiQuery={apiQueryDashboardList}
                renderOption={(option: any) => (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    width={'100%'}
                  >
                    <Box>
                      <Typography variant="body2" component={'span'} flex={1}>
                        {truncateText(option?.name)}
                      </Typography>
                    </Box>
                    {option?.isDefault && (
                      <Chip
                        size="small"
                        label="Default"
                        variant="outlined"
                        color={'success'}
                        component={'span'}
                      />
                    )}
                  </Box>
                )}
              />
            </FormProvider>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={Permissions?.AIR_SERVICES_MANAGE_DASHBOARD}
          >
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => router?.push(AIR_SERVICES?.MANAGE_DASHBOARD)}
              disabled={apiLoader?.isLoading || apiLoader?.isFetching}
            >
              Manage Dashboards
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <br />
      <br />
      <Box ref={downloadRef}>
        <SingleDashboard
          dashboardId={dashboardId}
          setDashboardId={setDashboardId}
          apiLoader={apiLoader}
          setApiLoader={setApiLoader}
        />
      </Box>
      <br />
      {isDrawerOpen && (
        <EmailThisDashboard
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          downloadReport={(type: any) => downloadReport?.(type)}
          isDownloading={isDownloading}
        />
      )}
    </Box>
  );
};

export default Dashboard;
