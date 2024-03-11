import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Software from '@/modules/airServices/Assets/Software';

const SoftwarePage = () => {
  return <Software />;
};

SoftwarePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_ASSETS_SOFTWARE_LIST_VIEW}>
      {page}
    </Layout>
  );
};

export default SoftwarePage;
