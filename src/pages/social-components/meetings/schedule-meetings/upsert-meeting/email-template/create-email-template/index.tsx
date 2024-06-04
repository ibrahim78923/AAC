import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CreateEmail from '@/modules/SocialComponents/Meetings/ScheduleMeetings/UpsertMeeting/EmailTemplate/CreateEmail';

const CreateEmailTemplatePage = () => {
  return <CreateEmail />;
};
export default CreateEmailTemplatePage;

CreateEmailTemplatePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.SOCIAL_COMPONENT_UPSERT_MEETING}>
      {page}
    </Layout>
  );
};
