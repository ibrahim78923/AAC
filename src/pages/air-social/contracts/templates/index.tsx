import Layout from '@/layout';
import ContractTemplates from '@/modules/airSocial/Contracts/ContractTemplates';

const ContractTemplatesPage = () => {
  return <ContractTemplates />;
};
export default ContractTemplatesPage;

ContractTemplatesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout variant="plain" guardRoute>
      {page}
    </Layout>
  );
};
