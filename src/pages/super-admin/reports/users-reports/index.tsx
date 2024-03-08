import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import UsersReports from '@/modules/superAdmin/Reports/UsersReports';

const UsersReportsPage = () => {
  return <UsersReports />;
};

export default UsersReportsPage;
UsersReportsPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.SUPER_ADMIN_REPORTS}>{page}</Layout>;
};
