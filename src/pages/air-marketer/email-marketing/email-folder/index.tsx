import Layout from '@/layout';
import EmailFolder from '@/modules/airMarketer/EmailMarketing/EmailFolder';

const EmailFolderPage = () => {
  return <EmailFolder />;
};
export default EmailFolderPage;
EmailFolderPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
