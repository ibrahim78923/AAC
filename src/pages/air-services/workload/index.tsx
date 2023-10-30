import Layout from '@/layout';
import { Workload } from '@/modules/airServices/Workload';

const WorkLoadPage = () => {
  return <Workload />;
};

WorkLoadPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default WorkLoadPage;
