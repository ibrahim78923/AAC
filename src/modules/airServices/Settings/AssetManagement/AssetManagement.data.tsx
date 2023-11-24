import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AIR_SERVICES } from '@/constants';

import { AssetTypeIcon, ProductCatalogIcon, VendorIcon } from '@/assets/icons';

export const assetManagement = [
  {
    id: 1,
    avatar: AssetTypeIcon,
    type: 'Asset Type',
    link: AIR_SERVICES?.ASSET_TYPE_SETTINGS,
  },
  {
    id: 2,
    avatar: ProductCatalogIcon,
    type: 'Product Catalog',
    link: AIR_SERVICES?.PRODUCT_CATALOG_SETTINGS,
  },
  {
    id: 3,
    avatar: VendorIcon,
    type: 'Vendor',
    link: AIR_SERVICES?.VENDOR_SETTINGS,
  },
  {
    id: 4,
    avatar: LocationOnIcon,
    type: 'Location',
    link: AIR_SERVICES?.LOCATION_SETTINGS,
  },
];
