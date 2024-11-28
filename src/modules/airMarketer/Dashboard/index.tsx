import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import FormsTable from './StaticComponents/FormsTable';
import ContactCustomerGraph from './StaticComponents/ContactCustomerGraph';
import CtaViews from './StaticComponents/CtaViews';
import ManageDashboardOptions from './ManageDashboardOptions';
import ShareOptions from './ShareOptions';
import useDashboard from './useDashboard';
import NoData from '@/components/NoData';
import { PlusIcon } from '@/assets/icons';
import { capitalizeFirstLetters } from '@/utils';
import { ProfileStatistics } from './StaticComponents/ProfileStatistics';
// commented for future use
// import SmsMarketingGraph from './StaticComponents/SmsMarketingGraph';
// import TotalMarketingEmail from './StaticComponents/TotalMarketingEmail';
// import WhatsappMarketingGraph from './StaticComponents/WhatsappMarketingGraph';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { indexNumbers } from '@/constants';
import { Autorenew } from '@mui/icons-material';
import { pxToRem } from '@/utils/getFontValue';
import { TruncateText } from '@/components/TruncateText';

const Dashboard = () => {
  const {
    lazyGetSingleMarketingDashboardStatus,
    setSelectedDashboard,
    selectedDashboard,
    dashboardNotFound,
    apiCallInProgress,
    dashboardLoading,
    dropdownOptions,
    dashboardsData,
    handelNavigate,
    defaultDashboard,
    dashboardListLoading,
    currentUser,
    disabled,
    timeLapse,
    router,
    user,
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
        <>
          {dashboardsData?.Profile_Stats?.length > indexNumbers?.ZERO && (
            <Grid item xs={12}>
              <ProfileStatistics />
            </Grid>
          )}
          {dashboardsData?.ctaTotalViewsAndAdsSubmissions && (
            <Grid item xs={12} lg={6}>
              <CtaViews />
            </Grid>
          )}
          {dashboardsData?.newContactsAndCustomers && (
            <Grid item xs={12} lg={6}>
              <ContactCustomerGraph />
            </Grid>
          )}
          {/* commented for future use  */}
          {/* <Grid item xs={12} lg={6}>
                    <TotalMarketingEmail />
                  </Grid> */}
          {dashboardsData?.leadCapturedForms && (
            <Grid item xs={12} lg={6}>
              <FormsTable
                data={dashboardsData?.leadCapturedForms?.leadcaptureforms}
              />
            </Grid>
          )}
          {/* commented for future use  */}
          {/* <Grid item xs={12}>
                    <SmsMarketingGraph />
                  </Grid>
                  <Grid item xs={12}>
                    <WhatsappMarketingGraph />
                  </Grid> */}
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
