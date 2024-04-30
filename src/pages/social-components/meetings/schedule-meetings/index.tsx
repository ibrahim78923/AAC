import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ScheduleMeetings } from '@/modules/SocialComponents/Meetings/ScheduleMeetings';

const ScheduleMeetingsPage = () => {
  return <ScheduleMeetings />;
};
export default ScheduleMeetingsPage;

ScheduleMeetingsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.SOCIAL_COMPONENTS_MEETINGS}>
      {page}
    </Layout>
  );
};
