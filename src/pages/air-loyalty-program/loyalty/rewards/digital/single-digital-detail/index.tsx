import Layout from '@/layout';
import { SingleDigitalDetails } from '@/modules/airLoyaltyProgram/Loyalty/Rewards/Digital/SingleDigitalDetails';

const SingleDigitalDetailsPage = () => <SingleDigitalDetails />;

export default SingleDigitalDetailsPage;
SingleDigitalDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
