import Layout from '@/layout';
import EmailReports from '@/modules/airMarketer/EmailMarketing/EmailReports';

const EmailReportsPage = () => {
  return <EmailReports />;
};
export default EmailReportsPage;
EmailReportsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
