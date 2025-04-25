import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ContractView from '@/modules/airSocial/Contracts/ContractView';

const ContractViewPage = () => {
  return <ContractView />;
};
export default ContractViewPage;
ContractViewPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      variant="plain"
      guardRoute
      permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}
    >
      {page}
    </Layout>
  );
};
