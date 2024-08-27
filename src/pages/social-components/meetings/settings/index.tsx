import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Settings } from '@/modules/SocialComponents/Meetings/Settings';

const MeetingsSettingsPage = () => {
  return <Settings />;
};
export default MeetingsSettingsPage;

MeetingsSettingsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.SOCIAL_COMPONENTS_MEETINGS}>
      {page}
    </Layout>
  );
};
