import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CreateBroadcast from '@/modules/airMarketer/WhatsAppMarketing/WhatsAppMarketingComponent/Broadcast/CreateBroadcast';

const CreateBroadcastPage = () => {
  return <CreateBroadcast />;
};

export default CreateBroadcastPage;
CreateBroadcastPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_MARKETER_WHATSAPP_BROADCAST_CREATE_BROADCAST
      }
    >
      {page}
    </Layout>
  );
};
