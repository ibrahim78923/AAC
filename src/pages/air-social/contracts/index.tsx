import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

const ContractPage = () => {
  return <h1>Contracts Page</h1>;
};
export default ContractPage;
ContractPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}>
      {page}
    </Layout>
  );
};
