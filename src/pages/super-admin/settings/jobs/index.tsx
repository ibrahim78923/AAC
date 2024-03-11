import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Jobs from '@/modules/superAdmin/settings/Jobs';

const JobsPage = () => {
  return <Jobs />;
};
export default JobsPage;
JobsPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.SETTING_JOBS}>{page}</Layout>;
};
