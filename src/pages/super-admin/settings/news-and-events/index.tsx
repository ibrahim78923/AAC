import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import NewsAndEvents from '@/modules/superAdmin/settings/NewsAndEvents';
const NewsAndEventsPage = () => {
  return <NewsAndEvents />;
};
export default NewsAndEventsPage;
NewsAndEventsPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.SETTING_NEWS_EVENTS}>{page}</Layout>;
};
