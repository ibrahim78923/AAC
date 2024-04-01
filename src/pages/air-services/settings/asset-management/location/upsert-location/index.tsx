import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import UpsertLocation from '@/modules/airServices/Settings/AssetManagement/Location/UpsertLocation';

const UpsertLocationPage = () => {
  return <UpsertLocation />;
};

export default UpsertLocationPage;

UpsertLocationPage.getLayout = function getLayout(page: any) {
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
