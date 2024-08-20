import Layout from '@/layout';
import GmailChat from '@/modules/SocialComponents/emails/GoogleMail/Chat';
function EmailConversations() {
  return <GmailChat />;
}
export default EmailConversations;
EmailConversations.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_EMAIL}
    <Layout guardRoute variant="common">
      {page}
    </Layout>
  );
};
