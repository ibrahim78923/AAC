import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Typography } from '@mui/material';

export const Header = (props: any) => {
  const { upsertTiersHandler, upsertRulesHandler } = props;
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={1}
        flexWrap={'wrap'}
      >
        <Typography variant="h3" color={'slateBlue.main'}>
          Tiers and Rules
        </Typography>
        <Box display={'flex'} gap={2} flexWrap={'wrap'}>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS?.CREATE_RULES,
            ]}
          >
            <Button variant="contained" onClick={() => upsertRulesHandler?.()}>
              Create Rules
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS?.CREATE_TIERS,
            ]}
          >
            <Button variant="contained" onClick={() => upsertTiersHandler?.()}>
              Create Tiers
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
    </>
  );
};
