import { RHFAutocomplete } from '@/components/ReactHookForm';
import { ManageDashboardFilterFormDefaultValuesDynamicI } from './ManageDashboardFilter.interface';
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '../UpsertDashboard/UpsertDashboard.data';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { DashboardNameFieldDropdown } from '../DashboardFormFields/DashboardNameFieldDropdown';
import { DashboardOwnersFieldDropdown } from '../DashboardFormFields/DashboardOwnersFieldDropdown';

const accessRightsOptions = [
  {
    label: 'Private to owner',
    _id: MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER,
  },
  {
    label: 'Everyone',
    _id: MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE,
  },
  {
    label: 'Special user',
    _id: MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS,
  },
];

export const manageDashboardFilterFormDefaultValuesDynamic = (
  data: ManageDashboardFilterFormDefaultValuesDynamicI,
) => {
  return {
    dashboard: data?.dashboard ?? null,
    owner: data?.owner ?? null,
    accessRights: data?.accessRights ?? null,
  };
};

export const manageDashboardsFilterFormFieldsDynamic = () => [
  {
    id: 1,
    component: DashboardNameFieldDropdown,
    gridLength: 12,
  },
  {
    id: 2,

    gridLength: 12,
    component: DashboardOwnersFieldDropdown,
  },
  {
    id: 3,
    componentProps: {
      fullWidth: true,
      name: 'accessRights',
      label: 'Access Rights',
      placeholder: 'Select Access Rights',
      options: accessRightsOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];
