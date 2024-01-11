import Layout from '@/layout';
import Management from '@/modules/airLoyaltyProgram/Settings/management';

const ManagementPage = () => <Management />;

export default ManagementPage;

ManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
