import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import NewsAndEvents from '@/modules/settings/NewsAndEvents';
const NewsAndEventsPage = () => {
  return <NewsAndEvents />;
};
export default NewsAndEventsPage;
NewsAndEventsPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
