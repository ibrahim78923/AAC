import Layout from '@/layout';
import { Design } from '@/modules/airLoyaltyProgram/GiftCards/GiftCards/PhysicalGiftCards/Design';

const PhysicalCardDesignPage = () => <Design />;

export default PhysicalCardDesignPage;

PhysicalCardDesignPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
