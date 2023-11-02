import Layout from '@/layout';
import { SingleViewArticle } from '@/modules/airServices/KnowledgeBase/Articles/SingleViewArticle';
const ViewArticlePage = () => {
  return <SingleViewArticle />;
};

ViewArticlePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ViewArticlePage;
