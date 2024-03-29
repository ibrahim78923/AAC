import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { KnowledgeBase } from '@/modules/airCustomerPortal/KnowledgeBase';

const KnowledgeBasePage = () => {
  return <KnowledgeBase />;
};

KnowledgeBasePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE}>
      {page}
    </Layout>
  );
};

export default KnowledgeBasePage;
