import { TicketStatusCount } from '@/modules/airServices/Dashboard/TicketStatusCount';
import { Box } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { useSingleDashboard } from './useSingleDashboard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { DashboardFilter } from '../DashboardFilter';
import { FormProvider } from '@/components/ReactHookForm';
import { DashboardWidgets } from '../DashboardsWidgets';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { ApiPollingButton } from '@/components/Buttons/ApiPollingButton';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { MESSAGES } from '@/constants/messages';
import { AIR_SERVICES } from '@/constants/routes';
import { LinkButton } from '@/components/Buttons/LinkButton';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const SingleDashboard = (props: any) => {
  const { isPreviewMode = false, isDetailMode = false } = props;
  const {
    lazyGetSingleServicesDashboardStatus,
    methods,
    downloadRef,
    moveToDashboard,
    dashboardName,
    reportsList,
    apiSuspenseState,
    hasDefaultDashboard,
    hasError,
    refetchApi,
  } = useSingleDashboard(props);

  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD,
        ]}
      >
        <Box>
          {isDetailMode ? (
            <PageTitledHeader
              title={
                apiSuspenseState ? <CustomLinearProgress /> : dashboardName
              }
              canMovedBack
              moveBack={moveToDashboard}
            />
          ) : (
            <></>
          )}
          {isPreviewMode || isDetailMode ? (
            <></>
          ) : (
            <FormProvider methods={methods}>
              <DashboardFilter
                apiLoader={lazyGetSingleServicesDashboardStatus}
                hasDefaultDashboard={hasDefaultDashboard}
                hasError={hasError}
                refetchApi={refetchApi}
                showLoader={apiSuspenseState}
                downloadRef={downloadRef}
              />
            </FormProvider>
          )}
          <Box ref={downloadRef}>
            <TicketStatusCount />
            <br />
            <ApiRequestFlow
              hasNoData={!reportsList?.length}
              hasError={hasError}
              refreshApi={refetchApi}
              showSkeleton={apiSuspenseState}
              noDataMessage={
                hasDefaultDashboard
                  ? MESSAGES?.NO_DEFAULT_DASHBOARD
                  : MESSAGES?.NO_WIDGETS_FOUND
              }
              skeletonType={SKELETON_TYPES?.BASIC_CARD}
              cardSkeletonType={
                SKELETON_TYPES?.LARGE_VERTICAL_TWO_LAYER_DOUBLE_CARD
              }
              noDataChildren={
                hasDefaultDashboard && (
                  <PermissionsGuard
                    permissions={[
                      AIR_SERVICES_DASHBOARD_PERMISSIONS?.CREATE_DASHBOARD,
                    ]}
                  >
                    <LinkButton
                      link={AIR_SERVICES?.CREATE_DASHBOARD}
                      name="Create Dashboard"
                    />
                  </PermissionsGuard>
                )
              }
            >
              <Box sx={{ textAlign: 'right', mb: 0.5 }}>
                <ApiPollingButton
                  showLoader={apiSuspenseState}
                  onClick={refetchApi}
                  variant="text"
                  intervalTime={AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD}
                  isFetching={lazyGetSingleServicesDashboardStatus?.isFetching}
                  fulfilledTimeStamp={
                    lazyGetSingleServicesDashboardStatus?.fulfilledTimeStamp
                  }
                />
              </Box>
              <DashboardWidgets
                reportsList={reportsList}
                apiData={lazyGetSingleServicesDashboardStatus?.data?.data}
                refetchApi={lazyGetSingleServicesDashboardStatus?.refetch}
                lazyGetSingleServicesDashboardStatus={
                  lazyGetSingleServicesDashboardStatus
                }
                isPreviewMode={isPreviewMode}
                isDetailMode={isDetailMode}
              />
            </ApiRequestFlow>
          </Box>
        </Box>
      </PermissionsGuard>
    </>
  );
};
