import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { UpdateContract } from '@/modules/airServices/Assets/Contracts/UpdateContract';

const UpdateContractPage = () => {
  return (
    <>
      <UpdateContract />
    </>
  );
};

UpdateContractPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.ADD_CONTRACT]}
    >
      {page}
    </Layout>
  );
};

export default UpdateContractPage;
