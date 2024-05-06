import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { UpsertMeeting } from '@/modules/SocialComponents/Meetings/ScheduleMeetings/UpsertMeeting';

const UpsertMeetingPage = () => {
  return <UpsertMeeting />;
};
export default UpsertMeetingPage;

UpsertMeetingPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING]}
    >
      {page}
    </Layout>
  );
};
