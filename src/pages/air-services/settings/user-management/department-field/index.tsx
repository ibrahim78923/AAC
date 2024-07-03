import Layout from '@/layout';
import { DepartmentField } from '@/modules/airServices/Settings/UserManagement/DepartmentField';
import { Permissions } from '@/constants/permissions';

const DepartmentFieldPage = () => {
  return <DepartmentField />;
};

export default DepartmentFieldPage;

DepartmentFieldPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_DEPARTMENT_FIELDS
      }
    >
      {page}
    </Layout>
  );
};
