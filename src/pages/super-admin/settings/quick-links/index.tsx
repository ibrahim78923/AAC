import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import QuickLinks from '@/modules/superAdmin/settings/QuickLinks';
const QuickLinksPage = () => {
  return <QuickLinks />;
};
export default QuickLinksPage;
QuickLinksPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.SETTING_QUICK_LINKS}>{page}</Layout>;
};
