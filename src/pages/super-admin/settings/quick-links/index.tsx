import Layout from '@/layout';
import QuickLinks from '@/modules/superAdmin/settings/QuickLinks';
const QuickLinksPage = () => {
  return <QuickLinks />;
};
export default QuickLinksPage;
QuickLinksPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
