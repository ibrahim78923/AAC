import Layout from '@/layout';
import { ServiceManagement } from '@/modules/airServices/Settings/ServiceManagement';

const ServiceManagementPage = () => {
  return <ServiceManagement />;
};

export default ServiceManagementPage;

ServiceManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
