import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { UpsertContract } from '@/modules/airServices/Assets/Software/SingleSoftwareDetail/Contracts/UpsertContract';

const UpsertContractPage = () => {
  return (
    <>
      <UpsertContract />
    </>
  );
};

UpsertContractPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={[AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.CONTRACTS]}>
      {page}
    </Layout>
  );
};

export default UpsertContractPage;
