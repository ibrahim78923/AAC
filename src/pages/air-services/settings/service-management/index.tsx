import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ServiceManagement } from '@/modules/airServices/Settings/ServiceManagement';

const ServiceManagementPage = () => {
  return <ServiceManagement />;
};

export default ServiceManagementPage;

ServiceManagementPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT}>
      {page}
    </Layout>
  );
};
