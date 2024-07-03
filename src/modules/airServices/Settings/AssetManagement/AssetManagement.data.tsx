import LocationOnIcon from '@mui/icons-material/LocationOn';
import GavelIcon from '@mui/icons-material/Gavel';
import PaidIcon from '@mui/icons-material/Paid';
import { AIR_SERVICES } from '@/constants';
import {
  AssetTypeIcon,
  ProductCatalogIcon,
  VendorIcon,
  VendorFieldsIcon,
  SoftwareFieldsIcon,
} from '@/assets/icons';

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
    avatar: VendorFieldsIcon,
    type: 'Vendor Fields',
    link: AIR_SERVICES?.VENDOR_FIELDS_SETTINGS,
  },
  {
    id: 5,
    avatar: SoftwareFieldsIcon,
    type: 'Software Fields',
    link: AIR_SERVICES?.SOFTWARE_FIELDS,
  },
  {
    id: 6,
    avatar: GavelIcon,
    type: 'Contract Type',
    link: AIR_SERVICES?.CONTRACT_TYPES,
  },
  {
    id: 7,
    avatar: PaidIcon,
    type: 'Purchase Order Fields',
    link: AIR_SERVICES?.PURCHASE_ORDER_FIELDS,
  },
  {
    id: 8,
    avatar: LocationOnIcon,
    type: 'Location',
    link: AIR_SERVICES?.LOCATION_SETTINGS,
  },
];
