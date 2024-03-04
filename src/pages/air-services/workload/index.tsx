import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Workload } from '@/modules/airServices/Workload';

const WorkloadPage = () => {
  return <Workload />;
};

WorkloadPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permission={[Permissions?.AIR_SERVICES_WORKLOAD_CALENDER_VIEW]}>
      {page}
    </Layout>
  );
};

export default WorkloadPage;
