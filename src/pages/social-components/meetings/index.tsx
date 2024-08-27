import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Meetings } from '@/modules/SocialComponents/Meetings';

const MeetingsPage = () => {
  return <Meetings />;
};
export default MeetingsPage;

MeetingsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.SOCIAL_COMPONENTS_MEETINGS}>
      {page}
    </Layout>
  );
};
