import Layout from '@/layout';
import Email from '@/modules/superAdmin/Email';
function EmailPage() {
  return <Email />;
}
export default EmailPage;
EmailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
