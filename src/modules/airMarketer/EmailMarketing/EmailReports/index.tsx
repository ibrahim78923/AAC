import { Box, Grid, Typography } from '@mui/material';
import PerformanceChart from './PerformanceChart';
import ActivityChart from './ActivityChart';
import { styles } from './styles';
import RecipientEngagement from './RecipientEngagement';
import { DocumentDownloadIcon } from '@/assets/icons';

const EmailReports = () => {
  return (
    <Box>
      <Box sx={styles?.emailReportsWrap}>
        <Typography variant="h3">Email Analytics</Typography>
      </Box>
      <Box sx={styles?.recipientEngagement}>
        <Typography variant="h4">Recipient Engagement</Typography>
        <RecipientEngagement />
      </Box>
      <Box>
        <Box sx={{ ...styles?.emailReportsWrap, my: 2 }}>
          <Typography variant="h4">Email Chart</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <DocumentDownloadIcon />
            <Typography variant="h4" sx={{ fontWeight: 400, color: '#38CAB5' }}>
              Download Reports
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Box sx={styles?.performaceWrap}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Performance
              </Typography>
              <PerformanceChart />
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box sx={styles?.performaceWrap}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Activity
              </Typography>
              <ActivityChart />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EmailReports;
