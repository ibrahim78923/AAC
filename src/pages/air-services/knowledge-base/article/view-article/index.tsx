import Layout from '@/layout';
import { SingleViewArticle } from '@/modules/airServices/KnowledgeBase/Articles/SingleViewArticle';
const ViewArticlesPage = () => {
  return <SingleViewArticle />;
};

ViewArticlesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ViewArticlesPage;
