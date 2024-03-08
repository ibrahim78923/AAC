import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Assets } from '@/modules/airServices/Assets';
const AssetsPage = () => {
  return <Assets />;
};

AssetsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_ASSETS_SOFTWARE_LIST_VIEW}>
      {page}
    </Layout>
  );
};

export default AssetsPage;
