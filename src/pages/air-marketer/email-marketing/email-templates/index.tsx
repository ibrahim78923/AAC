import Layout from '@/layout';
import EmailTemplates from '@/modules/airMarketer/EmailMarketing/EmailTemplates';

const EmailTemplatesPage = () => {
  return <EmailTemplates />;
};
export default EmailTemplatesPage;
EmailTemplatesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
