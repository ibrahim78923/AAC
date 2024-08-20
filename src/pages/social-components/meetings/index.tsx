import Layout from '@/layout';
import { Meetings } from '@/modules/SocialComponents/Meetings';

const MeetingsPage = () => {
  return <Meetings />;
};
export default MeetingsPage;

MeetingsPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_MEETINGS}
    <Layout variant="common">{page}</Layout>
  );
};
