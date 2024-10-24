import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { AIR_SERVICES } from '@/constants/routes';
import { ClosureRuleIcon, ServicesCatalogIcon } from '@/assets/icons';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Permissions } from '@/constants/permissions';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { ISettingsCards } from '../Settings.interface';

export const serviceManagement: ISettingsCards[] = [
  {
    id: 1,
    avatar: ServicesCatalogIcon,
    type: 'Services Catalog',
    purpose: `Create and manage fields to capture information about projects`,
    link: AIR_SERVICES?.SERVICE_CATALOG_SETTINGS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_SERVICE_CATALOG,
  },
  {
    id: 2,
    avatar: BusinessCenterIcon,
    type: 'Business Hours',
    purpose: `Create and manage fields to capture information about projects`,
    link: AIR_SERVICES?.BUSINESS_HOURS_SETTINGS,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_BUSINESS_HOURS,
  },
  {
    id: 3,
    avatar: ClosureRuleIcon,
    type: 'Closure Rule',
    purpose: `Create and manage fields to capture information about projects`,
    link: AIR_SERVICES?.CLOSURE_RULE_SETTINGS,
    permissions: [
      AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.SET_CLOSURE_RULES_AGAINST_TICKETS,
    ],
  },
  {
    id: 4,
    avatar: BackupTableIcon,
    type: 'Field Manager',
    purpose: `Create and manage fields to capture information about projects`,
    link: AIR_SERVICES?.FIELD_MANAGER,
    permissions:
      Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_FIELD_MANAGER,
  },
];
