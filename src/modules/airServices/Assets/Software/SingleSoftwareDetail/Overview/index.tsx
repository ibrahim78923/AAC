import { Box } from '@mui/material';
import ContractOverview from './ContractOverview';
import ContractUtilization from './ContractUtilization';
import UsageActivity from './UsageActivity';
import { contractOverviewLabel } from './Overview.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';

export const Overview = () => {
  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.OVERVIEW]}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        gap={'1.5rem'}
        flexWrap={'wrap'}
      >
        <UsageActivity />
        <ContractUtilization />
        <ContractOverview contractOverviewLabel={contractOverviewLabel} />
      </Box>
    </PermissionsGuard>
  );
};
