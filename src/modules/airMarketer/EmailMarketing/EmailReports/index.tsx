import { Box, Grid, Skeleton, Typography } from '@mui/material';
import PerformanceChart from './PerformanceChart';
import ActivityChart from './ActivityChart';
import { styles } from './styles';
import RecipientEngagement from './RecipientEngagement';
import { DocumentDownloadIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_EMAIL_MARKETING_EMAIL_REPORTS_PERMISSIONS } from '@/constants/permission-keys';
import { useGetEmailMarketingReportsQuery } from '@/services/airMarketer/emailReports';

const EmailReports = () => {
  const { data, isLoading } = useGetEmailMarketingReportsQuery({ params: {} });

  const emailWidgetsData = data?.data?.emailEngagement[0];
  const performanceData = data?.data?.performance;

  return (
    <Box>
      <Box sx={styles?.emailReportsWrap}>
        <Typography variant="h3">Email Analytics</Typography>
      </Box>
      <Box sx={styles?.recipientEngagement}>
        <Typography variant="h4">Recipient Engagement</Typography>
        {isLoading ? (
          <WidgetsLoading />
        ) : (
          <RecipientEngagement emailWidgetsData={emailWidgetsData} />
        )}
      </Box>
      <Box>
        <Box sx={{ ...styles?.emailReportsWrap, my: 2 }}>
          <Typography variant="h4">Email Chart</Typography>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_EMAIL_MARKETING_EMAIL_REPORTS_PERMISSIONS.DOWNLOAD_REPORTS,
            ]}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <DocumentDownloadIcon />
              <Typography
                variant="h4"
                sx={{ fontWeight: 400, color: '#38CAB5' }}
              >
                Download Reports
              </Typography>
            </Box>
          </PermissionsGuard>
        </Box>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Box sx={styles?.performaceWrap}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Performance
              </Typography>
              {isLoading ? (
                <BoxLoading />
              ) : (
                <PerformanceChart performanceData={performanceData} />
              )}
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box sx={styles?.performaceWrap}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Activity
              </Typography>
              {isLoading ? (
                <BoxLoading />
              ) : (
                <ActivityChart emailWidgetsData={emailWidgetsData} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const WidgetsLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item) => (
        <Box key={item}>
          <Skeleton variant="circular" width={120} height={120} />
          <center>
            <Skeleton
              variant="rounded"
              width={100}
              height={20}
              sx={{ mt: 1 }}
            />
          </center>
        </Box>
      ))}
    </Box>
  );
};
const BoxLoading = () => {
  return (
    <Skeleton
      variant="rounded"
      sx={{ width: '100%', height: '300px', mt: 2 }}
    />
  );
};

export default EmailReports;
