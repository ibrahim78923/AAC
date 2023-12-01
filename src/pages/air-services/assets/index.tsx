import Layout from '@/layout';
import { Assets } from '@/modules/airServices/Assets';
const AssetsPage = () => {
  return <Assets />;
};

AssetsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AssetsPage;
