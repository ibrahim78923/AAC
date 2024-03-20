import Layout from '@/layout';
import AddRole from '@/modules/orgAdmin/RolesAndRights/AddRole';
import { Permissions } from '@/constants/permissions';

const AddRolePage = () => {
  return <AddRole />;
};
export default AddRolePage;
AddRolePage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_ROLE_AND_RIGHTS}>
      {page}
    </Layout>
  );
};
