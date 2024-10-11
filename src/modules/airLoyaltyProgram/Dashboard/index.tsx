import { Box, Grid, Stack } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
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
    <PermissionsGuard
      permissions={[AIR_LOYALTY_PROGRAM_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
    >
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
              <Rewards />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GriftCards />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PointsTransaction />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </PermissionsGuard>
  );
};
