import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GavelIcon from '@mui/icons-material/Gavel';
import { AIR_SERVICES } from '@/constants';

import PaidIcon from '@mui/icons-material/Paid';

export const assetManagement = [
  {
    id: 1,
    avatar: AccountCircleIcon,
    type: 'Asset Type',
    link: AIR_SERVICES?.ASSET_TYPE_SETTINGS,
  },
  {
    id: 2,
    avatar: MarkEmailUnreadIcon,
    type: 'Product Catalog',
    link: AIR_SERVICES?.PRODUCT_CATALOG_SETTINGS,
  },
  {
    id: 3,
    avatar: SettingsIcon,
    type: 'Vendor',
    link: AIR_SERVICES?.VENDOR_SETTINGS,
  },
  {
    id: 4,
    avatar: AccountCircleIcon,
    type: 'Vendor Fields',
    link: '',
  },
  {
    id: 5,
    avatar: MarkEmailUnreadIcon,
    type: 'Software Fields',
    link: '',
  },
  {
    id: 6,
    avatar: GavelIcon,
    type: 'Contract Type',
    link: '',
  },
  {
    id: 7,
    avatar: PaidIcon,
    type: 'Purchase Order Fields',
    link: '',
  },
  {
    id: 8,
    avatar: LocationOnIcon,
    type: 'Location',
    link: AIR_SERVICES?.LOCATION_SETTINGS,
  },
];
