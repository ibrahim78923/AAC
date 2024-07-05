import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CreateTemplatesForm from '@/modules/airMarketer/EmailMarketing/EmailTemplates/CreateEmailTemplates';

const CreateTemplatesPage = () => {
  return <CreateTemplatesForm />;
};
export default CreateTemplatesPage;
CreateTemplatesPage.getLayout = function getLayout(page: any) {
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
