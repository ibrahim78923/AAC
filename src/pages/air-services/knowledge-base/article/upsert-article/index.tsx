import Layout from '@/layout';
import { UpsertArticle } from '@/modules/airServices/KnowledgeBase/Articles/UpsertArticle';
const UpsertArticlePage = () => {
  return <UpsertArticle />;
};

UpsertArticlePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default UpsertArticlePage;
