import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { Design } from '@/modules/airLoyaltyProgram/GiftCards/GiftCards/PhysicalGiftCards/Design';

const PhysicalCardDesignPage = () => <Design />;

export default PhysicalCardDesignPage;

PhysicalCardDesignPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[
        AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.DESIGN_CARD,
      ]}
    >
      {page}
    </Layout>
  );
};
