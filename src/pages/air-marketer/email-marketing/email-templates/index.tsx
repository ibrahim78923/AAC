import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import EmailTemplates from '@/modules/airMarketer/EmailMarketing/EmailTemplates';

const EmailTemplatesPage = () => {
  return <EmailTemplates />;
};
export default EmailTemplatesPage;
EmailTemplatesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={
        Permissions.AIR_MARKETER_EMAIL_MARKETING_EMAIL_TEMPLATES_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
