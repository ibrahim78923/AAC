import Layout from '@/layout';
import { ServicesCatalog } from '@/modules/airServices/Settings/ServiceManagement/ServicesCatalog';

const ServicesCatalogPage = () => {
  return <ServicesCatalog />;
};

export default ServicesCatalogPage;

ServicesCatalogPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
