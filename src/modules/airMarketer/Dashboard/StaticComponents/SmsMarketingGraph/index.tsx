import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import useSmsMarketingGraph from './useSmsMarketingGraph';
import StatusCards from './StatusCards';
import StatisticsCard from './StatisticsCard';

const SmsMarketingGraph = () => {
  const { theme } = useSmsMarketingGraph();
  return (
    <Card>
      <Box p={1.5}>
        <Stack direction="column">
          <Typography variant="h5" fontWeight={500}>
            SMS Marketing
          </Typography>
          <Typography variant="body3" color={theme?.palette?.grey[900]}>
            Date range In last 30 days
          </Typography>
        </Stack>
        <Grid container>
          <Grid item xs={12}>
            <StatusCards />
          </Grid>
          <Grid item xs={12}>
            <StatisticsCard />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default SmsMarketingGraph;
