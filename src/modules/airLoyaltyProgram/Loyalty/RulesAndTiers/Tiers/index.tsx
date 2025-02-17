import Search from '@/components/Search';
import { useTiers } from './useTiers';
import { Box } from '@mui/material';
import { TiersList } from './TiersList';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS } from '@/constants/permission-keys';

const Tiers = () => {
  const { handleSetSearch } = useTiers();

  return (
    <Box
      border={1}
      borderColor="custom.off_white_three"
      borderRadius={2}
      boxShadow={1}
    >
      <PermissionsGuard
        permissions={[
          AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS?.SEARCH_RULES_AND_TIERS,
        ]}
      >
        <Box p={2}>
          <Search label="Search Here" setSearchBy={handleSetSearch} />
        </Box>
      </PermissionsGuard>
      <TiersList />
    </Box>
  );
};

export default Tiers;
