import Layout from '@/layout';
import { KnowledgeBaseTicketDetail } from '@/modules/airCustomerPortal/KnowledgeBase/KnowledgeBaseDetail/KnowledgeBaseTicketDetail';

const KnowledgeBaseTicketDetailPage = () => {
  return <KnowledgeBaseTicketDetail />;
};

KnowledgeBaseTicketDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default KnowledgeBaseTicketDetailPage;
