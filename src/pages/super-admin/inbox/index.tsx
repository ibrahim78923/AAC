import Layout from '@/layout';
import EmailChat from '@/modules/superAdmin/Email/Chat';
function EmailPage() {
  return <EmailChat />;
}
export default EmailPage;
EmailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
