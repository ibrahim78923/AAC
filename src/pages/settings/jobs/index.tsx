import Layout from '@/layout';
import Jobs from '@/modules/settings/Jobs';

const JobsPage = () => {
  return <Jobs />;
};
export default JobsPage;
JobsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
