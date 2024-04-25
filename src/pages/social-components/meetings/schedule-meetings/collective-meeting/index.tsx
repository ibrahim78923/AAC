import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { CollectiveMeeting } from '@/modules/SocialComponents/Meetings/ScheduleMeetings/CollectiveMeeting';

const CollectiveMeetingPage = () => {
  return <CollectiveMeeting />;
};
export default CollectiveMeetingPage;

CollectiveMeetingPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING]}
    >
      {page}
    </Layout>
  );
};
