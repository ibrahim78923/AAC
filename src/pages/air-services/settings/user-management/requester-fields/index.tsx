import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { RequesterFields } from '@/modules/airServices/Settings/UserManagement/RequesterFields';

const RequesterFieldsPage = () => {
  return <RequesterFields />;
};

export default RequesterFieldsPage;

RequesterFieldsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_AGENT_REQUESTER_FIELDS
      }
    >
      {page}
    </Layout>
  );
};
