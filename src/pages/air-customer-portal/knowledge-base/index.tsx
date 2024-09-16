import Layout from '@/layout';
import { KnowledgeBase } from '@/modules/airCustomerPortal/KnowledgeBase';

const KnowledgeBasePage = () => {
  return <KnowledgeBase />;
};

KnowledgeBasePage.getLayout = function getLayout(page: any) {
  return <Layout variant={'customer-portal'}>{page}</Layout>;
};

export default KnowledgeBasePage;
