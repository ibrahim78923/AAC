import Layout from '@/layout';

import ViewDetails from '@/modules/SocialComponents/ViewDetails';

const ViewDetailsPage = () => {
  // permissions={
  //     Permissions?.SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS
  //   }
  return (
    <Layout guardRoute variant="common">
      <ViewDetails />
    </Layout>
  );
};

export default ViewDetailsPage;
