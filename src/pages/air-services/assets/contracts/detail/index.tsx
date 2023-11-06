import Layout from '@/layout';
import { SingleContractDetails } from '@/modules/airServices/Assets/Contracts/SingleContractDetails';
const SingleContractDetailsPage = () => {
  return <SingleContractDetails />;
};

SingleContractDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SingleContractDetailsPage;
