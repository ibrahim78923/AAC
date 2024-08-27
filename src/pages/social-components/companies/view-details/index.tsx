import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

import ViewDetails from '@/modules/SocialComponents/ViewDetails';

const ViewDetailsPage = () => {
  return (
    <Layout
      guardRoute
      permissions={
        Permissions?.SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS
      }
    >
      <ViewDetails />
    </Layout>
  );
};

export default ViewDetailsPage;
