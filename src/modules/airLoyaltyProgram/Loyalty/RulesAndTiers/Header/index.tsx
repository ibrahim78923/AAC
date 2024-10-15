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
          <Button
            className="small"
            variant="contained"
            onClick={openCreateRulePortal}
          >
            Create Rules
          </Button>
          <Button
            className="small"
            variant="contained"
            onClick={openCreateTiersPortal}
          >
            Create Tiers
          </Button>
        </Box>
      </Box>
      {isRulePortalOpen?.isOpen &&
        loyaltyProgramRulesActionComponent?.[isRulePortalOpen?.action]}
      {isTierPortalOpen?.isOpen &&
        loyaltyProgramTiersActionComponent?.[isTierPortalOpen?.action]}
    </>
  );
};
