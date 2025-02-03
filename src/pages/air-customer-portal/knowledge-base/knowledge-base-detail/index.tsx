import Layout from '@/layout';
import { KnowledgeBaseDetail } from '@/modules/airCustomerPortal/KnowledgeBase/Articles';

const KnowledgeBaseDetailPage = () => {
  return <KnowledgeBaseDetail />;
};

KnowledgeBaseDetailPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'customer-portal'}>{page}</Layout>;
};

export default KnowledgeBaseDetailPage;
