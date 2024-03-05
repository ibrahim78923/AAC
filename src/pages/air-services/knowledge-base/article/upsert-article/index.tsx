import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertArticle } from '@/modules/airServices/KnowledgeBase/Articles/UpsertArticle';

const UpsertArticlePage = () => {
  return <UpsertArticle />;
};

UpsertArticlePage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_CREATE_ARTICLE]}
    >
      {page}
    </Layout>
  );
};

export default UpsertArticlePage;
