import Layout from '@/layout';
import UsersReports from '@/modules/superAdmin/Reports/UsersReports';

const UsersReportsPage = () => {
  return <UsersReports />;
};

export default UsersReportsPage;
UsersReportsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
