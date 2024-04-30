import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';
import { EditDesign } from '@/modules/airLoyaltyProgram/GiftCards/GiftCards/PhysicalGiftCards/EditDesign';

const PhysicalCardDesignEditPage = () => (
  <PermissionsGuard
    permissions={[
      AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.DESIGN_CARD,
    ]}
  >
    <EditDesign />;
  </PermissionsGuard>
);

export default PhysicalCardDesignEditPage;
