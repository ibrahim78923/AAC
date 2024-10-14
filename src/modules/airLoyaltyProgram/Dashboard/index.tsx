import { Box, Grid, Stack } from '@mui/material';
import { Header } from './Header';
import { useDashboard } from './useDashboard';
import { Widgets } from './Widgets';
import { TopConsumer } from './TopConsumer';
import { Rewards } from './Rewards';
import { GriftCards } from './GriftCards';
import { PointsTransaction } from './PointsTransaction';

export const Dashboard = () => {
  const {
    selectionRange,
    setSelectionRange,
    anchorElDate,
    setAnchorElDate,
    handleCloseDate,
    handleApplyDate,
    widgetsDataArray,
  } = useDashboard();

  return (
    <Stack spacing={3}>
      <Header
        selectionRange={selectionRange}
        setSelectionRange={setSelectionRange}
        anchorElDate={anchorElDate}
        setAnchorElDate={setAnchorElDate}
        handleCloseDate={handleCloseDate}
        handleApplyDate={handleApplyDate}
      />

      <Widgets widgetsDataArray={widgetsDataArray} />

      <TopConsumer topConsumerData={[]} />

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Rewards rewardsData={[]} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <GriftCards griftCardsData={[]} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <PointsTransaction pointsTransactionData={[]} />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};
