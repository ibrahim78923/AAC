import Layout from '@/layout';
import { UpdateContract } from '@/modules/airServices/Assets/Contracts/UpdateContract';

const UpdateContractPage = () => {
  return <UpdateContract />;
};

UpdateContractPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default UpdateContractPage;
