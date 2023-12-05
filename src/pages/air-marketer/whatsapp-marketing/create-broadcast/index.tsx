import Layout from '@/layout';
import CreateBroadcast from '@/modules/airMarketer/WhatsAppMarketing/WhatsAppMarketingComponent/CreateBroadcast';

const CreateBroadcastPage = () => {
  return <CreateBroadcast />;
};

export default CreateBroadcastPage;
CreateBroadcastPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
