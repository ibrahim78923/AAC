import Layout from '@/layout';
import { AssetManagement } from '@/modules/airServices/Settings/AssetManagement';

const AssetManagementPage = () => {
  return <AssetManagement />;
};

export default AssetManagementPage;

AssetManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
