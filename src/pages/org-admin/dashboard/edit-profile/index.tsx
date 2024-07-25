import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

import EditProfile from '@/modules/EditProfile';

const EditProfilePage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_DASHBOARD}>
      <EditProfile />
    </Layout>
  );
};

export default EditProfilePage;
