import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

import PostBox from '@/modules/airMarketer/SocialMarketing/PostBox';

const PostBoxPage = () => {
  return (
    <Layout
      guardRoute
      permissions={Permissions.AIR_MARKETER_SOCIAL_MAKETER_POST_BOX_PERMISSIONS}
    >
      <PostBox />
    </Layout>
  );
};

export default PostBoxPage;
