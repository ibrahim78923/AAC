import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Contracts from '@/modules/airSocial/Contracts';

const ContractPage = () => {
  return <Contracts />;
};
export default ContractPage;
ContractPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}>
      {page}
    </Layout>
  );
};
