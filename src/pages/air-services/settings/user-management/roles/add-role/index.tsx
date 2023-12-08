import Layout from '@/layout';
import UpsertRoles from '@/modules/airServices/Settings/UserManagement/Roles/UpsertRoles';

const AddRolePage = () => {
  return <UpsertRoles />;
};

export default AddRolePage;

AddRolePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
