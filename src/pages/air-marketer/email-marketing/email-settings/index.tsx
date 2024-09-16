import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import EmailSettings from '@/modules/airMarketer/EmailMarketing/EmailSettings';

const EmailSettingsPage = () => {
  return <EmailSettings />;
};
export default EmailSettingsPage;
EmailSettingsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={
        Permissions?.AIR_MARKETER_EMAIL_MARKETING_EMAIL_TEMPLATES_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
