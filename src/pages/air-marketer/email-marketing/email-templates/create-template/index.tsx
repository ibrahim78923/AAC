import Layout from '@/layout';

const CreateTemplatesPage = () => {
  return 'Create Template';
};
export default CreateTemplatesPage;
CreateTemplatesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
