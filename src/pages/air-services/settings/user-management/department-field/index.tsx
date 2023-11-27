import Layout from '@/layout';
import { DepartmentField } from '@/modules/airServices/Settings/UserManagement/DepartmentField';

const DepartmentFieldPage = () => {
  return <DepartmentField />;
};

export default DepartmentFieldPage;

DepartmentFieldPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
