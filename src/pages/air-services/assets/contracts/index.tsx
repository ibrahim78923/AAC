import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Contaracts from '@/modules/airServices/Assets/Contracts';

const ServicesTicketsPage = () => {
  return <Contaracts />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_ASSETS_CONTRACTS_LIST_VIEW}>
      {page}
    </Layout>
  );
};

export default ServicesTicketsPage;
