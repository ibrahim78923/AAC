import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { UpsertContract } from '@/modules/airServices/Assets/Contracts/UpsertContract';

const UpsertContractPage = () => {
  return (
    <>
      <UpsertContract />
    </>
  );
};

UpsertContractPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.ADD_CONTRACT]}
    >
      {page}
    </Layout>
  );
};

export default UpsertContractPage;
