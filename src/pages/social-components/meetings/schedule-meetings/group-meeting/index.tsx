import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { GroupMeeting } from '@/modules/SocialComponents/Meetings/ScheduleMeetings/GroupMeeting';

const GroupMeetingPage = () => {
  return <GroupMeeting />;
};
export default GroupMeetingPage;

GroupMeetingPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING]}
    >
      {page}
    </Layout>
  );
};
