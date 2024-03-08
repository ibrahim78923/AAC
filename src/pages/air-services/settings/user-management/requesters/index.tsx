import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Requesters } from '@/modules/airServices/Settings/UserManagement/Requesters';

const RequestersPage = () => {
  return <Requesters />;
};

RequestersPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_REQUESTERS_VIEW_DETAILS
      }
    >
      {page}
    </Layout>
  );
};

export default RequestersPage;
