import Layout from '@/layout';
import { EmailNotification } from '@/modules/airServices/Settings/AccountSettings/EmailNotification';

const EmailNotificationPage = () => {
  return <EmailNotification />;
};

export default EmailNotificationPage;

EmailNotificationPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
