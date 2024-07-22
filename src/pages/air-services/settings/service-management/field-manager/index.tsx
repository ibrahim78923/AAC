import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import FieldManager from '@/modules/airServices/Settings/ServiceManagement/FieldManager';

const FieldManagerPage = () => {
  return <FieldManager />;
};

export default FieldManagerPage;

FieldManagerPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_FIELD_MANAGER
      }
    >
      {page}
    </Layout>
  );
};
