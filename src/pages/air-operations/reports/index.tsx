import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Reports } from '@/modules/airOperations/Reports';

const ReportsPage = () => <Reports />;

export default ReportsPage;

ReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_REPORTS}>{page}</Layout>
  );
};
