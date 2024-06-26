import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';
import { EditPhysicalCard } from '@/modules/airLoyaltyProgram/GiftCards/GiftCards/PhysicalGiftCards/EditPhysicalCard';

const PhysicalCardDesignEditPage = () => (
  <PermissionsGuard
    permissions={[
      AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.DESIGN_CARD,
    ]}
  >
    <EditPhysicalCard />;
  </PermissionsGuard>
);

export default PhysicalCardDesignEditPage;
