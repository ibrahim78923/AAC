import ProfileCard from '@/components/ProfileCard';
import CommonTabs from '@/components/Tabs';
import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import { Typography } from '@mui/material';

function UserManagementPage() {
  return (
    <div>
      <Typography variant="h4">User Management</Typography>
      <CommonTabs
        isHeader
        // searchBarProps={{
        //   onChange: (e: any) => {
        //     console.log(e);
        //   },
        // }}
        // headerChildren={
        //   <>
        //     <Button variant="contained">Actions</Button>
        //     <Button variant="outlined">Filter</Button>
        //   </>
        // }
        tabsArray={['Accounts', 'Profile']}
      >
        <Typography variant="h3">this is accounts</Typography>
        <Typography variant="h3">this is profile</Typography>
      </CommonTabs>

      <ProfileCard
        userName="Muabshir Yusuf"
        email="mubashir.yusuf@ceative.co.uk"
        phone="03014654334"
        role="OrgAdmin"
        editBtn={true}
      />
    </div>
  );
}
export default UserManagementPage;
UserManagementPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
