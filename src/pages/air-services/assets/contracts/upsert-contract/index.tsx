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
  return <Layout>{page}</Layout>;
};

export default UpsertContractPage;
