import Layout from '@/layout';
import { KnowledgeBase } from '@/modules/airServices/KnowledgeBase';
const KnowledgeBasePage = () => {
  return <KnowledgeBase />;
};

KnowledgeBasePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default KnowledgeBasePage;
