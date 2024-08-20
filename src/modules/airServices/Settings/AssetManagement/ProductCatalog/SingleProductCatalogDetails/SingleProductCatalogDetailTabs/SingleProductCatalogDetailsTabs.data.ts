import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Overview } from '../Overview';
import { Vendors } from '../Vendors';
import { AssociatedAssets } from '../AssociatedAssets';

export const singleProductCatalogDetailTabsData = [
  {
    _id: 1,
    name: 'Overview',
    id: 'overview',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.VIEW_PRODUCT_DETAILS,
    ],
    component: Overview,
  },
  {
    _id: 2,
    name: 'Vendors',
    id: 'vendors',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.VIEW_PRODUCT_VENDORS,
    ],
    component: Vendors,
  },
  {
    _id: 3,
    name: 'Associated Assets',
    id: 'associatedAssets',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.VIEW_PRODUCT_ASSOCIATION_ASSETS,
    ],
    component: AssociatedAssets,
  },
];
