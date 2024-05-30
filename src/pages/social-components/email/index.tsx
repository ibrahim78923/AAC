import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Email from '@/modules/SocialComponents/emails';
function EmailPage() {
  return <Email />;
}
export default EmailPage;
EmailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_EMAIL}>
      {page}
    </Layout>
  );
};
