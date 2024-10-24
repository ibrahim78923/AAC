import { Button, Grid, Skeleton, Stack, Typography } from '@mui/material';
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
import { indexNumbers } from '@/constants';

const Dashboard = () => {
  const {
    dashboardListLoading,
    setSelectedDashboard,
    dashboardNotFound,
    dashboardLoading,
    dropdownOptions,
    dashboardsData,
    handelNavigate,
  } = useDashboard();
  return (
    <>
      <Grid container spacing={2} sx={{ paddingLeft: '0px' }}>
        <Grid item xs={12}>
          <Stack
            direction={{ sm: 'row' }}
            justifyContent="space-between"
            gap={1}
          >
            {dashboardLoading ? (
              <Skeleton
                width={250}
                height={36}
                variant={'rectangular'}
                animation={'wave'}
              />
            ) : (
              <Stack direction="column">
                <Typography variant="h3">
                  {capitalizeFirstLetters(dashboardsData?.dashboard?.name)}
                </Typography>
              </Stack>
            )}

            <Stack direction={{ sm: 'row' }} gap={1}>
              {!dashboardNotFound && (
                <ShareOptions selectedDashboard={dashboardsData} />
              )}
              <ManageDashboardOptions
                listData={dropdownOptions}
                selectedDashboard={setSelectedDashboard}
                isLoading={dashboardListLoading}
              />
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
    </>
  );
};

export default Dashboard;
