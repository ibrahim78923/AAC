import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ServicesCatalog } from '@/modules/airServices/Settings/ServiceManagement/ServicesCatalog';

const ServicesCatalogPage = () => {
  return <ServicesCatalog />;
};

export default ServicesCatalogPage;

ServicesCatalogPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_SERVICE_CATALOG
      }
    >
      {page}
    </Layout>
  );
};
