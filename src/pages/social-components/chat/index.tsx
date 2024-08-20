import Layout from '@/layout';
import Chat from '@/modules/SocialComponents/Chat';

const ChatPage = () => {
  return <Chat />;
};
export default ChatPage;
ChatPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_CHAT}
    <Layout guardRoute variant="common">
      {page}
    </Layout>
  );
};
