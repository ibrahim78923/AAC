import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Typography } from '@mui/material';
import { useHeader } from './useHeader';
import {
  loyaltyProgramRulesActionComponent,
  loyaltyProgramTiersActionComponent,
} from './Header.data';

export const Header = () => {
  const {
    isRulePortalOpen,
    isTierPortalOpen,
    openCreateRulePortal,
    openCreateTiersPortal,
  } = useHeader();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={1}
        flexWrap={'wrap'}
      >
        <Typography variant="h3" color="slateBlue.main">
          Tiers and Rules
        </Typography>

        <Box display={'flex'} gap={2} flexWrap={'wrap'}>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS?.CREATE_RULES,
            ]}
          >
            <Button
              className="small"
              variant="contained"
              onClick={openCreateRulePortal}
            >
              Create Rules
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS?.CREATE_TIERS,
            ]}
          >
            <Button
              className="small"
              variant="contained"
              onClick={openCreateTiersPortal}
            >
              Create Tiers
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      {isRulePortalOpen?.isOpen &&
        loyaltyProgramRulesActionComponent?.[isRulePortalOpen?.action]}
      {isTierPortalOpen?.isOpen &&
        loyaltyProgramTiersActionComponent?.[isTierPortalOpen?.action]}
    </>
  );
};
