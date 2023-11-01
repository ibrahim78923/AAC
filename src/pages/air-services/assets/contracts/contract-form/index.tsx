import Layout from '@/layout';
import { UpsertContract } from '@/modules/airServices/Assets/Contracts/UpsertContract';

const ContractFormPage = () => {
  return (
    <>
      <UpsertContract />
    </>
  );
};

ContractFormPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ContractFormPage;
