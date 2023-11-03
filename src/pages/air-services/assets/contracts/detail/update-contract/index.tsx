import Layout from '@/layout';
import { UpdateContract } from '@/modules/airServices/Assets/Contracts/UpdateContract';

const ServicesTicketsPage = () => {
  return <UpdateContract />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ServicesTicketsPage;
