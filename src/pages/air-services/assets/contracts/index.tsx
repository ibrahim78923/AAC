import Layout from '@/layout';
import Contaracts from '@/modules/airServices/Assets/Contracts';

const ServicesTicketsPage = () => {
  return <Contaracts />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ServicesTicketsPage;
