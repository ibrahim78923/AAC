import Layout from '@/layout';
import { ScheduleMeetings } from '@/modules/SocialComponents/Meetings/ScheduleMeetings';

const ScheduleMeetingsPage = () => {
  return <ScheduleMeetings />;
};
export default ScheduleMeetingsPage;

ScheduleMeetingsPage.getLayout = function getLayout(page: any) {
  return (
    //  permissions={Permissions?.SOCIAL_COMPONENTS_MEETINGS}
    <Layout variant="common">{page}</Layout>
  );
};
