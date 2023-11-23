import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { AIR_SERVICES } from '@/constants';
export const serviceManagement = [
  {
    id: 1,
    avatar: AccountCircleIcon,
    type: 'Service Catalog',
    purpose: `Create and manage fields to capture information about projects`,
    link: AIR_SERVICES?.SERVICE_CATALOG_SETTINGS,
  },
  {
    id: 2,
    avatar: BusinessCenterIcon,
    type: 'Business Hours',
    purpose: `Create and manage fields to capture information about projects`,
    link: AIR_SERVICES?.BUSINESS_HOURS_SETTINGS,
  },
  {
    id: 3,
    avatar: SettingsIcon,
    type: 'Closure Rule',
    purpose: `Create and manage fields to capture information about projects`,
    link: AIR_SERVICES?.CLOSURE_RULE_SETTINGS,
  },
];
