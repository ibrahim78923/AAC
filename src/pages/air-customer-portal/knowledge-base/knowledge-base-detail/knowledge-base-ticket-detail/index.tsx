import Layout from '@/layout';
import { KnowledgeBaseArticleDetail } from '@/modules/airCustomerPortal/KnowledgeBase/KnowledgeBaseDetail/KnowledgeBaseArticleDetail';

const KnowledgeBaseTicketDetailPage = () => {
  return <KnowledgeBaseArticleDetail />;
};

KnowledgeBaseTicketDetailPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'customer-portal'}>{page}</Layout>;
};

export default KnowledgeBaseTicketDetailPage;
