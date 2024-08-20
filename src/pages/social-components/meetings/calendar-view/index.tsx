import Layout from '@/layout';
import { CalendarView } from '@/modules/SocialComponents/Meetings/CalendarView';

const CalendarViewPage = () => {
  return <CalendarView />;
};
export default CalendarViewPage;

CalendarViewPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_MEETINGS}
    <Layout variant="common">{page}</Layout>
  );
};
