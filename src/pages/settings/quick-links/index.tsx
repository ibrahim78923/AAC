import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import QuickLinks from '@/modules/settings/QuickLinks';
const QuickLinksPage = () => {
  return <QuickLinks />;
};
export default QuickLinksPage;
QuickLinksPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
