import Search from '@/components/Search';
import { RulesList } from './RulesList';
import { useRules } from './useRules';
import { Box } from '@mui/material';
import { AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const Rules = () => {
  const { handleSetSearch } = useRules();
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
          <Search label="Search here" setSearchBy={handleSetSearch} />
        </Box>
      </PermissionsGuard>
      <RulesList />
    </Box>
  );
};

export default Rules;
