import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';
import UpsertServices from '@/modules/airServices/Settings/ServiceManagement/ServicesCatalog/UpsertServices';

const UpsertServicePage = () => {
  return <UpsertServices />;
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
