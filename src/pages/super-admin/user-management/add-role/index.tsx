import Layout from '@/layout';

import AddRole from '@/modules/superAdmin/UserManagement/RolesAndRights/AddRole';

const UserManagementRolePage = () => {
  return (
    <div>
      <AddRole />
    </div>
  );
};
export default UserManagementRolePage;
UserManagementRolePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
