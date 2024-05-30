import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import EmailChat from '@/modules/SocialComponents/emails/OthersMail/Chat';
function EmailConversations() {
  return <EmailChat />;
}
export default EmailConversations;
EmailConversations.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_EMAIL}>
      {page}
    </Layout>
  );
};
