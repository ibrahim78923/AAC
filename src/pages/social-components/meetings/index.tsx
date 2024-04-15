import PageNotFound from '@/components/pageNotFound';
import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Email from '@/modules/superAdmin/Email';
function EmailPage() {
  return <Email />;
}
export default EmailPage;
EmailPage.getLayout = function getLayout() {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_MEETINGS}>
      <PageNotFound />
    </Layout>
  );
};
