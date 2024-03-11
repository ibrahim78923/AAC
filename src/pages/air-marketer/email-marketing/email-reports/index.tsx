import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import EmailReports from '@/modules/airMarketer/EmailMarketing/EmailReports';

const EmailReportsPage = () => {
  return <EmailReports />;
};
export default EmailReportsPage;
EmailReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={
        Permissions.AIR_MARKETER_EMAIL_MARKETING_EMAIL_REPORTS_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
