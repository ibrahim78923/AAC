import Layout from '@/layout';
import { UpsertMeeting } from '@/modules/SocialComponents/Meetings/ScheduleMeetings/UpsertMeeting';

const UpsertMeetingPage = () => {
  return <UpsertMeeting />;
};
export default UpsertMeetingPage;

UpsertMeetingPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENT_UPSERT_MEETING}
    <Layout variant="common">{page}</Layout>
  );
};
