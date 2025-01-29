import { Box, Stack } from '@mui/material';
import { Header } from './Header';
import { useDashboard } from './useDashboard';
import { Widgets } from './Widgets';
import { TopConsumer } from './TopConsumer';
import { Rewards } from './Rewards';
import { GiftCards } from './GiftCards';
import { PointsTransaction } from './PointsTransaction';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const Dashboard = () => {
  const {
    selectionRange,
    setSelectionRange,
    anchorElDate,
    setAnchorElDate,
    handleCloseDate,
    handleApplyDate,
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
        <Widgets />
        <TopConsumer />
        <Box>
          <ContainerGrid spacing={3}>
            <CustomGrid md={6} lg={4}>
              <Rewards />
            </CustomGrid>
            <CustomGrid md={6} lg={4}>
              <GiftCards />
            </CustomGrid>
            <CustomGrid md={6} lg={4}>
              <PointsTransaction />
            </CustomGrid>
          </ContainerGrid>
        </Box>
      </Stack>
    </PermissionsGuard>
  );
};
