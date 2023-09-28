import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import Faqs from '@/modules/settings/Faqs';
function FaqsPage() {
  return <Faqs />;
}
export default FaqsPage;
FaqsPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
