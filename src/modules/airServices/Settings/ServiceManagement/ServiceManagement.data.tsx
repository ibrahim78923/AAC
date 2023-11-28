import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { AIR_SERVICES } from '@/constants';
import { ClosureRuleIcon, ServicesCatalogIcon } from '@/assets/icons';
export const serviceManagement = [
  {
    id: 1,
    avatar: ServicesCatalogIcon,
    type: 'Services Catalog',
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
    avatar: ClosureRuleIcon,
    type: 'Closure Rule',
    purpose: `Create and manage fields to capture information about projects`,
    link: AIR_SERVICES?.CLOSURE_RULE_SETTINGS,
  },
];
