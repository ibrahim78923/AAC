import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SingleViewArticle } from '@/modules/airServices/KnowledgeBase/Articles/SingleViewArticle';
const ViewArticlesPage = () => {
  return <SingleViewArticle />;
};

ViewArticlesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_LIST_VIEW_DETAILS}
    >
      {page}
    </Layout>
  );
};

export default ViewArticlesPage;
