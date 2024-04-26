import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { KnowledgeBaseTicketDetail } from '@/modules/airCustomerPortal/KnowledgeBase/KnowledgeBaseDetail/KnowledgeBaseTicketDetail';

const KnowledgeBaseTicketDetailPage = () => {
  return <KnowledgeBaseTicketDetail />;
};

KnowledgeBaseTicketDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE}>
      {page}
    </Layout>
  );
};

export default KnowledgeBaseTicketDetailPage;
