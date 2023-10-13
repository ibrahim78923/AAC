import Layout from '@/layout';
import Chat from '@/modules/SocialComponents/Chat';

const ChatPage = () => {
  return <Chat />;
};
export default ChatPage;
ChatPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
