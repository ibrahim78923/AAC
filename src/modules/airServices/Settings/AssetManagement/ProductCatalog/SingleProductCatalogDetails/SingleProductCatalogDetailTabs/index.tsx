import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { singleProductCatalogDetailTabsData } from './SingleProductCatalogDetailsTabs.data';
import { Overview } from '../Overview';
import { Vendors } from '../Vendors';
import { AssociatedAssets } from '../AssociatedAssets';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const SingleProductCatalogDetailsTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={singleProductCatalogDetailTabsData}>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.VIEW_PRODUCT_DETAILS,
        ]}
      >
        <Overview />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.VIEW_PRODUCT_VENDORS,
        ]}
      >
        <Vendors />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.VIEW_PRODUCT_ASSOCIATION_ASSETS,
        ]}
      >
        <AssociatedAssets />
      </PermissionsGuard>
    </HorizontalTabs>
  );
};
