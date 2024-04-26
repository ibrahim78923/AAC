import Layout from '@/layout';
import Reports from '@/modules/airMarketer/Reports';
import { Permissions } from '@/constants/permissions';

const ReportsPage = () => {
  return <Reports />;
};

export default ReportsPage;

ReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_MARKETER_REPORTS}>{page}</Layout>
  );
};
