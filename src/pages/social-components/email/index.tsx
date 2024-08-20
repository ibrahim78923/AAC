import Layout from '@/layout';
import Email from '@/modules/SocialComponents/emails';
function EmailPage() {
  return <Email />;
}
export default EmailPage;
EmailPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_EMAIL}
    <Layout guardRoute variant="common">
      {page}
    </Layout>
  );
};
