import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import EmailFolder from '@/modules/airMarketer/EmailMarketing/EmailFolder';

const EmailFolderPage = () => {
  return <EmailFolder />;
};
export default EmailFolderPage;
EmailFolderPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={
        Permissions.AIR_MARKETER_EMAIL_MARKETING_EMAIL_FOLDERS_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
