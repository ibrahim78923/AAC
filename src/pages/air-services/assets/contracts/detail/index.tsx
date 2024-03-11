import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { SingleContractDetails } from '@/modules/airServices/Assets/Contracts/SingleContractDetails';
const SingleContractDetailsPage = () => {
  return <SingleContractDetails />;
};

SingleContractDetailsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[
        AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.VIEW_TASK_DETAILS,
      ]}
    >
      {page}
    </Layout>
  );
};

export default SingleContractDetailsPage;
