import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

import AddRole from '@/modules/superAdmin/UserManagement/RolesAndRights/AddRole';

const AddRolePage = () => {
  return <AddRole />;
};
export default AddRolePage;
AddRolePage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.user_management}>{page}</Layout>;
};
