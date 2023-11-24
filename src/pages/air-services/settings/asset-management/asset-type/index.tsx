import Layout from '@/layout';
import { AssetType } from '@/modules/airServices/Settings/AssetManagement/AssetType';

const AssetTypePage = () => {
  return <AssetType />;
};

export default AssetTypePage;

AssetTypePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
