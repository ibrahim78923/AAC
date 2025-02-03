import Layout from '@/layout';
import { ArticleDetail } from '@/modules/airCustomerPortal/KnowledgeBase/Articles/ArticleDetail';

const KnowledgeBaseTicketDetailPage = () => {
  return <ArticleDetail />;
};

KnowledgeBaseTicketDetailPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'customer-portal'}>{page}</Layout>;
};

export default KnowledgeBaseTicketDetailPage;
