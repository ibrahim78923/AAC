import LocationOnIcon from '@mui/icons-material/LocationOn';
import GavelIcon from '@mui/icons-material/Gavel';
import PaidIcon from '@mui/icons-material/Paid';
import { AIR_SERVICES } from '@/constants/routes';
import {
  AssetTypeIcon,
  ProductCatalogIcon,
  VendorIcon,
  VendorFieldsIcon,
  SoftwareFieldsIcon,
} from '@/assets/icons';
import { Permissions } from '@/constants/permissions';
import { ISettingsCards } from '../Settings.interface';

export const assetManagement: ISettingsCards[] = [
  {
    id: 1,
    avatar: AssetTypeIcon,
    type: 'Asset Type',
    link: AIR_SERVICES?.ASSET_TYPE_SETTINGS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_ASSET_TYPE,
  },
  {
    id: 2,
    avatar: ProductCatalogIcon,
    type: 'Product Catalog',
    link: AIR_SERVICES?.PRODUCT_CATALOG_SETTINGS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_AGENT_MANAGEMENT_PRODUCT_CATALOG,
  },
  {
    id: 3,
    avatar: VendorIcon,
    type: 'Vendor',
    link: AIR_SERVICES?.VENDOR_SETTINGS,
    permissions: Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT,
  },
  {
    id: 4,
    avatar: VendorFieldsIcon,
    type: 'Vendor Fields',
    link: AIR_SERVICES?.VENDOR_FIELDS_SETTINGS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_VENDOR_FIELDS,
  },
  {
    id: 5,
    avatar: SoftwareFieldsIcon,
    type: 'Software Fields',
    link: AIR_SERVICES?.SOFTWARE_FIELDS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_SOFTWARE_FIELDS,
  },
  {
    id: 6,
    avatar: GavelIcon,
    type: 'Contract Type',
    link: AIR_SERVICES?.CONTRACT_TYPES,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_CONTRACT_TYPE,
  },
  {
    id: 7,
    avatar: PaidIcon,
    type: 'Purchase Order Fields',
    link: AIR_SERVICES?.PURCHASE_ORDER_FIELDS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PURCHASE_ORDER_FIELDS,
  },
  {
    id: 8,
    avatar: LocationOnIcon,
    type: 'Location',
    link: AIR_SERVICES?.LOCATION_SETTINGS,
    permissions: Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_LOCATION,
  },
];
