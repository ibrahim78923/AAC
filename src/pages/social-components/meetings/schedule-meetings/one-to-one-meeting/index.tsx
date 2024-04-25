import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { OneToOneMeeting } from '@/modules/SocialComponents/Meetings/ScheduleMeetings/OneToOneMeeting';

const OneToOneMeetingPage = () => {
  return <OneToOneMeeting />;
};
export default OneToOneMeetingPage;

OneToOneMeetingPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING]}
    >
      {page}
    </Layout>
  );
};
