import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { KnowledgeBaseArticleDetail } from '@/modules/airCustomerPortal/KnowledgeBase/KnowledgeBaseDetail/KnowledgeBaseArticleDetail';

const KnowledgeBaseTicketDetailPage = () => {
  return <KnowledgeBaseArticleDetail />;
};

KnowledgeBaseTicketDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE}>
      {page}
    </Layout>
  );
};

export default KnowledgeBaseTicketDetailPage;
