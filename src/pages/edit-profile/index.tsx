import EditProfile from '@/modules/EditProfile';
import Layout from '@/layout';

function EditProfilePage() {
  return (
    <>
      <EditProfile />
    </>
  );
}
export default EditProfilePage;
EditProfilePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
