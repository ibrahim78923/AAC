import { RHFAutocomplete } from '@/components/ReactHookForm';
import { ManageDashboardFilterFormDefaultValuesDynamicI } from './ManageDashboardFilter.interface';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { DashboardNameFieldDropdown } from '../DashboardFormFields/DashboardNameFieldDropdown';
import { DashboardOwnersFieldDropdown } from '../DashboardFormFields/DashboardOwnersFieldDropdown';
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '../Dashboard.data';

const { PRIVATE_TO_OWNER, EVERYONE, SPECIFIC_USER_AND_TEAMS } =
  MANAGE_DASHBOARD_ACCESS_TYPES ?? {};

const accessRightsOptions = [
  {
    label: 'Private to owner',
    _id: PRIVATE_TO_OWNER,
  },
  {
    label: 'Everyone',
    _id: EVERYONE,
  },
  {
    label: 'Special user',
    _id: SPECIFIC_USER_AND_TEAMS,
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
    _id: 1,
    component: DashboardNameFieldDropdown,
  },
  {
    _id: 2,
    component: DashboardOwnersFieldDropdown,
    componentProps: {
      label: 'User',
      placeholder: 'Select user',
    },
  },
  {
    _id: 3,
    componentProps: {
      fullWidth: true,
      name: 'accessRights',
      label: 'Access rights',
      placeholder: 'Select access rights',
      options: accessRightsOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
];
