import EditProfile from '@/modules/EditProfile';
import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';

function EditProfilePage() {
  return (
    <>
      <EditProfile />
    </>
  );
}
export default EditProfilePage;
EditProfilePage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
