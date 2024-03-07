import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import AddNewLocation from '@/modules/airServices/Settings/AssetManagement/Location/AddNewLocation';

const AddNewLocationPage = () => {
  return <AddNewLocation />;
};

export default AddNewLocationPage;

AddNewLocationPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_ADD_LOCATION
      }
    >
      {page}
    </Layout>
  );
};
