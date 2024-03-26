import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { EmailNotification } from '@/modules/airServices/Settings/AccountSettings/EmailNotification';

const EmailNotificationPage = () => {
  return <EmailNotification />;
};

export default EmailNotificationPage;

EmailNotificationPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_SERVICES_SETTINGS_EMAIL_NOTIFICATIONS}
    >
      {page}
    </Layout>
  );
};
