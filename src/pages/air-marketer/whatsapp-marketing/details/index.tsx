import Layout from '@/layout';
import BroadcastDetail from '@/modules/airMarketer/WhatsAppMarketing/WhatsAppMarketingComponent/Broadcast/BroadcastDetails';

const BroadcastDetailPage = () => {
  return <BroadcastDetail />;
};

export default BroadcastDetailPage;
BroadcastDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
