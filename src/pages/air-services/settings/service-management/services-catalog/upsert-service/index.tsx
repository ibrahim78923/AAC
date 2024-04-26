import Layout from '@/layout';
import { UpsertService } from '@/modules/airServices/Settings/ServiceManagement/ServicesCatalog/Services/UpsertService';
import { Permissions } from '@/constants/permissions';
const UpsertServicePage = () => {
  return <UpsertService />;
};

export default UpsertServicePage;

UpsertServicePage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_SERVICE_ADD
      }
    >
      {page}
    </Layout>
  );
};
