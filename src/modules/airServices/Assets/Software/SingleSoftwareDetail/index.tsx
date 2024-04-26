import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import Header from './Header';
import { SingleSoftwareDetailTabs } from './SingleSoftwareDetailTabs';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';

export const SingleSoftwareDetail = () => {
  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.VIEW_DETAILS]}
    >
      <Header />
      <br />
      <SingleSoftwareDetailTabs />
    </PermissionsGuard>
  );
};
