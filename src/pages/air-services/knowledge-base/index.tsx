import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { KnowledgeBase } from '@/modules/airServices/KnowledgeBase';
const KnowledgeBasePage = () => {
  return <KnowledgeBase />;
};

KnowledgeBasePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_LIST_VIEW}>
      {page}
    </Layout>
  );
};

export default KnowledgeBasePage;
