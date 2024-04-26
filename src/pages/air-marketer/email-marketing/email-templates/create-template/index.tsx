import Layout from '@/layout';
import CreateTemplatesForm from '@/modules/airMarketer/EmailMarketing/EmailTemplates/CreateEmailTemplates';

const CreateTemplatesPage = () => {
  return <CreateTemplatesForm />;
};
export default CreateTemplatesPage;
CreateTemplatesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
