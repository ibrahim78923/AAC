import Layout from '@/layout';
import EmailMarketing from '@/modules/airMarketer/EmailMarketing';

const EmailMarketingPage = () => {
  return <EmailMarketing />;
};
export default EmailMarketingPage;
EmailMarketingPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
