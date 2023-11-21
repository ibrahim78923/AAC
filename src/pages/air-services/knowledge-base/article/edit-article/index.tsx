import Layout from '@/layout';
import { EditArticle } from '@/modules/airServices/KnowledgeBase/Articles/EditArticle';
const EditArticlePage = () => {
  return <EditArticle />;
};

EditArticlePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default EditArticlePage;
