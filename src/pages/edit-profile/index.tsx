import EditProfile from '@/modules/EditProfile';
import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';

function EditProfilePage() {
  return (
    <>
      <EditProfile />
    </>
  );
}
export default EditProfilePage;
EditProfilePage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_DASHBOARD}>
      {page}
    </Layout>
  );
};
