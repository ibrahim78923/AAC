import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { ManageDashboardFilterFormDefaultValuesDynamicI } from './ManageDashboardFilter.interface';
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '../../CreateDashboard/CreateDashboard.data';
import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';

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

export const manageDashboardsFilterFormFieldsDynamic = (
  apiQueryDashboardName?: any,
  apiQueryOwner?: any,
  productId?: string,
) => [
  {
    id: 1,
    component: RHFAutocompleteAsync,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'dashboard',
      label: 'Dashboard Name',
      placeholder: 'Select Dashboard Name',
      apiQuery: apiQueryDashboardName,
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        page: PAGINATION?.CURRENT_PAGE,
      },
      getOptionLabel: (option: AutocompleteAsyncOptionsI) => option?.name,
    },
  },
  {
    id: 2,
    componentProps: {
      fullWidth: true,
      name: 'owner',
      label: 'Owner',
      placeholder: 'Select Owner',
      apiQuery: apiQueryOwner,
      externalParams: { productId },
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    gridLength: 12,
    component: RHFAutocompleteAsync,
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
