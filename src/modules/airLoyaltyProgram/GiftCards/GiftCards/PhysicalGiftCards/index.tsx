import { Box, Button } from '@mui/material';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { AssignedPhysicalGiftCards } from './AssignedPhysicalGiftCards';
import { NotAssignedPhysicalGiftCards } from './NotAssignedPhysicalGiftCards';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';
import { AddWhiteBgIcon, DesignPenIcon } from '@/assets/icons';
import { useState } from 'react';
import { AddPhysicalGiftCard } from './AddPhysicalGiftCard';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { useRouter } from 'next/router';

export const PhysicalGiftCards = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const router = useRouter();
  return (
    <>
      <Box
        display={'flex'}
        gap={1}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'flex-end'}
      >
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.ADD_GIFT_CARD,
          ]}
        >
          <Button
            variant="contained"
            startIcon={<AddWhiteBgIcon />}
            onClick={() => setIsPortalOpen({ isOpen: true, isAdd: true })}
          >
            Add
          </Button>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.DESIGN_CARD,
          ]}
        >
          <Button
            size="small"
            variant="contained"
            startIcon={<DesignPenIcon />}
            onClick={() => {
              router?.push({
                pathname: AIR_LOYALTY_PROGRAM?.PHYSICAL_GIFT_CARD_DESIGN,
              });
            }}
          >
            Design card
          </Button>
        </PermissionsGuard>
      </Box>
      <br />
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
      {isPortalOpen?.isOpen && (
        <AddPhysicalGiftCard
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
        />
      )}
    </>
  );
};
