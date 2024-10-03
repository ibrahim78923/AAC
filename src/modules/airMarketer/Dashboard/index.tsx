import { Button, Grid, Skeleton, Stack, Typography } from '@mui/material';
import TotalMarketingEmail from './StaticComponents/TotalMarketingEmail';
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
import SmsMarketingGraph from './StaticComponents/SmsMarketingGraph';
import WhatsappMarketingGraph from './StaticComponents/WhatsappMarketingGraph';

const Dashboard = () => {
  const {
    dashboardListLoading,
    dropdownOptions,
    setIsShowEditDashboard,
    dashboardNotFound,
    dashboardLoading,
    setSelectedDashboard,
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
                <ShareOptions setIsShowEditDashboard={setIsShowEditDashboard} />
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
        ) : (
          <>
            <Grid item xs={12}>
              <ProfileStatistics />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CtaViews />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ContactCustomerGraph />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TotalMarketingEmail />
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormsTable />
            </Grid>
            <Grid item xs={12}>
              <SmsMarketingGraph />
            </Grid>
            <Grid item xs={12}>
              <WhatsappMarketingGraph />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
