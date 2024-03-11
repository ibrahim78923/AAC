import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SingleSoftwareDetail } from '@/modules/airServices/Assets/Software/SingleSoftwareDetail';
const SingleSoftwareDetailPage = () => {
  return <SingleSoftwareDetail />;
};

SingleSoftwareDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_SERVICES_ASSETS_SOFTWARE_VIEW_DETAILS}
    >
      {page}
    </Layout>
  );
};

export default SingleSoftwareDetailPage;
