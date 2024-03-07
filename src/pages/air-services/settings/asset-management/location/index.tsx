import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Location } from '@/modules/airServices/Settings/AssetManagement/Location';

const LocationPage = () => {
  return <Location />;
};

export default LocationPage;

LocationPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_LOCATION
      }
    >
      {page}
    </Layout>
  );
};
