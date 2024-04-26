import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { KnowledgeBaseDetail } from '@/modules/airCustomerPortal/KnowledgeBase/KnowledgeBaseDetail';

const KnowledgeBaseDetailPage = () => {
  return <KnowledgeBaseDetail />;
};

KnowledgeBaseDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE}>
      {page}
    </Layout>
  );
};

export default KnowledgeBaseDetailPage;
