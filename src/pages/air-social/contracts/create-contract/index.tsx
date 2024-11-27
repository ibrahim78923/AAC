import Layout from '@/layout';
import CreateContract from '@/modules/airSocial/Contracts/CreateContract';

const CreateContractPage = () => {
  return <CreateContract />;
};
export default CreateContractPage;

CreateContractPage.getLayout = function getLayout(page: any) {
  return (
    <Layout variant="plain" guardRoute>
      {page}
    </Layout>
  );
};
