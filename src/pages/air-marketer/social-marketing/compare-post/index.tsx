import Layout from '@/layout';
import CompareSocialPost from '@/modules/airMarketer/SocialMarketing/CompareSocialPost';

const ComparePostPage = () => {
  return <CompareSocialPost />;
};

export default ComparePostPage;

ComparePostPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
