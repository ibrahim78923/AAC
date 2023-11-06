import Layout from '@/layout';
import { KnowledgeBaseDetail } from '@/modules/airCustomerPortal/KnowledgeBase/KnowledgeBaseDetail';

const KnowledgeBaseDetailPage = () => {
  return <KnowledgeBaseDetail />;
};

KnowledgeBaseDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default KnowledgeBaseDetailPage;
