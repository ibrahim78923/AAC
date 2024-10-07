import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ModuleReports } from '@/modules/airOperations/Reports/ModuleReports';

const ReportsListPage = () => <ModuleReports />;

export default ReportsListPage;

ReportsListPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_REPORTS}>{page}</Layout>
  );
};
