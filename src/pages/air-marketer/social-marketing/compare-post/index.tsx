import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CompareSocialPost from '@/modules/airMarketer/SocialMarketing/CompareSocialPost';

const ComparePostPage = () => {
  return <CompareSocialPost />;
};

export default ComparePostPage;

ComparePostPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={
        Permissions.AIR_MARKETER_SOCIAL_MAKETER_COMPARE_SOCIAL_POST_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
