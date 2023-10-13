import Layout from '@/layout';

import AddRole from '@/modules/superAdmin/UserManagement/RolesAndRights/AddRole';

const AddRolePage = () => {
  return <AddRole />;
};
export default AddRolePage;
AddRolePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
