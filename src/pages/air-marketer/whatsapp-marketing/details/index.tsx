import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';
import BroadcastDetail from '@/modules/airMarketer/WhatsAppMarketing/WhatsAppMarketingComponent/Broadcast/BroadcastDetails';

const BroadcastDetailPage = () => {
  return <BroadcastDetail />;
};

export default BroadcastDetailPage;

BroadcastDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_MARKETER_SMS_BROADCAST_VIEW_BROADCAST_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
