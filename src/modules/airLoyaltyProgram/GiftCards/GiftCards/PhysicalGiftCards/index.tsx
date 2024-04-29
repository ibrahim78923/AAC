import { Box } from '@mui/material';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { AssignedPhysicalGiftCards } from './AssignedPhysicalGiftCards';
import { NotAssignedPhysicalGiftCards } from './NotAssignedPhysicalGiftCards';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';

export const PhysicalGiftCards = () => {
  return (
    <Box
      border={`.1rem solid`}
      borderColor={'grey.700'}
      borderRadius={2}
      p={1.5}
    >
      <HorizontalTabs tabsDataArray={['Assigned', 'Not Assigned']}>
        <PermissionsGuard
          permissions={
            Permissions?.AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_ASSIGNED
          }
        >
          <AssignedPhysicalGiftCards />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={
            Permissions?.AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_NOT_ASSIGNED
          }
        >
          <NotAssignedPhysicalGiftCards />
        </PermissionsGuard>
      </HorizontalTabs>
    </Box>
  );
};
