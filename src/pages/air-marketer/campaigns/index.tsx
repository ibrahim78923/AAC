import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Campaigns from '@/modules/airMarketer/Campaigns';

const CampaignsPage = () => {
  return <Campaigns />;
};
export default CampaignsPage;
CampaignsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={Permissions.AIR_MARKETER_CAMPAIGNS_PERMISSIONS}
    >
      {page}
    </Layout>
  );
};
