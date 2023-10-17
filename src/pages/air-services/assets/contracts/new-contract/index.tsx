import Layout from '@/layout';
import AddNewContract from '@/modules/airServices/Assets/Contracts/AddNewContract';
const NewContractPage = () => {
  return <AddNewContract />;
};

NewContractPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default NewContractPage;
