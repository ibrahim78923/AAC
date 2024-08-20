import Layout from '@/layout';
import EmailChat from '@/modules/SocialComponents/emails/OutlookMail/Chat';
function EmailConversations() {
  return <EmailChat />;
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
