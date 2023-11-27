import Layout from '@/layout';
import { Departments } from '@/modules/airServices/Settings/UserManagement/Departments';

const DepartmentsPage = () => {
  return <Departments />;
};

export default DepartmentsPage;

DepartmentsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
