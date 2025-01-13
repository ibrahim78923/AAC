import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { createElement } from 'react';
import FormsTable from './StaticComponents/FormsTable';
import ManageDashboardOptions from './ManageDashboardOptions';
import ShareOptions from './ShareOptions';
import useDashboard from './useDashboard';
import NoData from '@/components/NoData';
import { PlusIcon } from '@/assets/icons';
import { capitalizeFirstLetters } from '@/utils';
import { ProfileStatistics } from './StaticComponents/ProfileStatistics';
// commented for future use
// import SmsMarketingGraph from './StaticComponents/SmsMarketingGraph';
// import WhatsappMarketingGraph from './StaticComponents/WhatsappMarketingGraph';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { indexNumbers } from '@/constants';
import { Autorenew } from '@mui/icons-material';
import { pxToRem } from '@/utils/getFontValue';
import { TruncateText } from '@/components/TruncateText';
import { ReportsWidgets } from './ReportsWidgets';
import { REPORT_TYPES } from '@/constants/strings';
import TotalMarketingEmail from './StaticComponents/TotalMarketingEmail';
import SmsMarketingGraph from './StaticComponents/SmsMarketingGraph';
import WhatsappMarketingGraph from './StaticComponents/WhatsappMarketingGraph';

const Dashboard = () => {
  const {
    AIR_MARKETER_DASHBOARD_WIDGETS_COMPONENTS,
    lazyGetSingleMarketingDashboardStatus,
    setSelectedDashboard,
    dashboardListLoading,
    selectedDashboard,
    dashboardNotFound,
    apiCallInProgress,
    dashboardLoading,
    defaultDashboard,
    dropdownOptions,
    dashboardsData,
    handelNavigate,
    currentUser,
    disabled,
    timeLapse,
    router,
    user,
    downloadRef,
  } = useDashboard();

  return (
    <Grid container spacing={2} sx={{ paddingLeft: '0px' }}>
      <Grid item xs={12}>
        {dashboardLoading ? (
          <Skeleton
            width={250}
            height={25}
            variant="rectangular"
            animation="wave"
          />
        ) : (
          <Typography variant="h3" color="primary.main">
            <TruncateText text={dashboardsData?.dashboard?.name} size={35} />
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction={{ lg: 'row' }}
          gap={1}
          justifyContent={'space-between'}
        >
          <Box>
            {dashboardLoading ? (
              <Skeleton
                width={350}
                height={25}
                variant={'rectangular'}
                animation={'wave'}
              />
            ) : (
              <Typography
                variant="h4"
                fontWeight={'fontWeightSmall'}
                color="blue.main"
              >
                <Typography component="span" variant="h4">
                  Hi {capitalizeFirstLetters(user?.firstName) ?? '---'}!
                </Typography>{' '}
                Happy to see you again
              </Typography>
            )}
          </Box>

          <Stack direction="row" gap={1} flexWrap={'wrap'}>
            {selectedDashboard?.length > 0 && (
              <Button
                className="small"
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<Autorenew />}
                onClick={lazyGetSingleMarketingDashboardStatus?.refetch}
                disabled={apiCallInProgress}
                sx={{
                  fontSize: pxToRem(12),
                  fontWeight: 'fontWeightRegular',
                  textTransform: 'lowercase',
                }}
              >
                {!!apiCallInProgress ? (
                  <Box>
                    <LinearProgress sx={{ width: pxToRem(70) }} />
                  </Box>
                ) : (
                  timeLapse?.lastFetchLapseTime
                )}
              </Button>
            )}

            {!dashboardNotFound && (
              <ShareOptions
                currentUser={currentUser}
                selectedDashboard={dashboardsData}
                disabled={disabled}
                name={dashboardsData?.dashboard?.name}
                downloadRef={downloadRef}
              />
            )}

            <ManageDashboardOptions
              listData={dropdownOptions}
              selectedDashboard={setSelectedDashboard}
              isLoading={dashboardListLoading}
              defaultDashboard={defaultDashboard}
              setSelectedDashboard={setSelectedDashboard}
            />

            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={() => {
                router?.push({
                  pathname: `${AIR_MARKETER?.MANAGE_DASHBOARD}`,
                });
              }}
            >
              Manage Dashboards
            </Button>
          </Stack>
        </Stack>
      </Grid>
      {dashboardNotFound ? (
        <NoData message="No default dashboard found!">
          <Button
            startIcon={<PlusIcon />}
            variant="contained"
            onClick={handelNavigate}
          >
            Create Dashboard
          </Button>
        </NoData>
      ) : dashboardLoading ? (
        <Grid item xs={12} p={1}>
          <SkeletonForm />
        </Grid>
      ) : (
        <Box ref={downloadRef}>
          {dashboardsData?.Profile_Stats?.length > indexNumbers?.ZERO && (
            <Grid item xs={12}>
              <ProfileStatistics />
            </Grid>
          )}
          {/* {dashboardsData?.ctaTotalViewsAndAdsSubmissions && (
            <Grid item xs={12} lg={6}>
              <CtaViews />
            </Grid>
          )} */}
          {/* {dashboardsData?.newContactsAndCustomers && (
            <Grid item xs={12} lg={6}>
              <ContactCustomerGraph />
            </Grid>
          )} */}

          {dashboardsData?.totalMarketingEmail && (
            <Grid item xs={12} lg={6}>
              <TotalMarketingEmail
                data={dashboardsData?.totalMarketingEmail?.emailsmarketings}
              />
            </Grid>
          )}

          {dashboardsData?.leadCapturedForms && (
            <Grid item xs={12} lg={6}>
              <FormsTable
                data={dashboardsData?.leadCapturedForms?.leadcaptureforms}
              />
            </Grid>
          )}
          {/* commented for future use  */}
          {dashboardsData?.smsMarketing && (
            <Grid item xs={12}>
              <SmsMarketingGraph data={dashboardsData?.smsMarketing} />
            </Grid>
          )}
          {dashboardsData?.whatsappMarketing && (
            <Grid item xs={12}>
              <WhatsappMarketingGraph
                data={dashboardsData?.whatsappMarketing}
              />
            </Grid>
          )}

          {/* Dynamic Components */}
          {dashboardLoading ? (
            <Grid item xs={12} p={1}>
              <SkeletonForm />
            </Grid>
          ) : (
            dashboardsData?.dashboard?.reports?.map(
              (item: any, index: number) => {
                return item?.type === REPORT_TYPES?.STATIC ? (
                  <Grid item xs={12} key={item?.name}>
                    {AIR_MARKETER_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name] &&
                      createElement(
                        AIR_MARKETER_DASHBOARD_WIDGETS_COMPONENTS?.[item?.name],
                        {
                          data: dashboardsData,
                          // Add any other necessary props here
                        },
                      )}
                  </Grid>
                ) : (
                  <Grid item xs={12} lg={12} key={item?._id ?? index}>
                    <ReportsWidgets
                      reportWidgets={dashboardsData?.[`genericReports${index}`]}
                      reportResults={
                        dashboardsData?.[`genericReportsResult${index}`]
                      }
                    />
                  </Grid>
                );
              },
            )
          )}
        </Box>
      )}
    </Grid>
  );
};

export default Dashboard;
