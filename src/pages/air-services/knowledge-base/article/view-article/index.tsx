import Layout from '@/layout';
import { ViewArticles } from '@/modules/airServices/KnowledgeBase/Articles/ViewArticles';
const ViewArticlesPage = () => {
  return <ViewArticles />;
};

ViewArticlesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ViewArticlesPage;
