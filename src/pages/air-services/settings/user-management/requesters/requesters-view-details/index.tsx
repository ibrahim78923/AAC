import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { RequestorsViewDetails } from '@/modules/airServices/Settings/UserManagement/Requesters/RequestorsViewDetails';

const RequestersViewPage = () => {
  return <RequestorsViewDetails />;
};

export default RequestersViewPage;

RequestersViewPage.getLayout = function getLayout(page: any) {
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
