import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { AIR_SERVICES } from '@/constants';
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
    avatar: SettingsIcon,
    type: 'Contract Type',
    link: '',
  },
  {
    id: 7,
    avatar: MarkEmailUnreadIcon,
    type: 'Purchase Order Fields',
    link: '',
  },
  {
    id: 8,
    avatar: SettingsIcon,
    type: 'Location',
    link: AIR_SERVICES?.LOCATION_SETTINGS,
  },
];
