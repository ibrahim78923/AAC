import Layout from '@/layout';
import { SinglePhysicalDetails } from '@/modules/airLoyaltyProgram/Loyalty/Rewards/Physical/SinglePhysicalDetails';

const SinglePhysicalDetailsPage = () => <SinglePhysicalDetails />;

export default SinglePhysicalDetailsPage;
SinglePhysicalDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
