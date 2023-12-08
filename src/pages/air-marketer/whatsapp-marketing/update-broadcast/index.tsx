import Layout from '@/layout';
import UpdateBroadcast from '@/modules/airMarketer/WhatsAppMarketing/WhatsAppMarketingComponent/Broadcast/UpdateBroadcast';

const UpdateBroadcastPage = () => {
  return <UpdateBroadcast />;
};

export default UpdateBroadcastPage;
UpdateBroadcastPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
