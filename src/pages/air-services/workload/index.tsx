import Layout from '@/layout';
import { Workload } from '@/modules/airServices/Workload';

const WorkloadPage = () => {
  return <Workload />;
};

WorkloadPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default WorkloadPage;
