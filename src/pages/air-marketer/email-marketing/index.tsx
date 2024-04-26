import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import EmailMarketing from '@/modules/airMarketer/EmailMarketing';

const EmailMarketingPage = () => {
  return <EmailMarketing />;
};
export default EmailMarketingPage;
EmailMarketingPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={
        Permissions.AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
