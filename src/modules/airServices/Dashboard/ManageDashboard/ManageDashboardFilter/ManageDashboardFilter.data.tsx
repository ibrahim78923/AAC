import { RHFAutocomplete } from '@/components/ReactHookForm';
import { dashboardsData } from '../ManageDashboard.data';

// filter options data
const dashboardNameOptions = dashboardsData?.map((item: any) => ({
  label: item?.dashboardName,
  value: item?.dashboardName,
}));

const ownerOptions = dashboardsData?.map((item: any) => ({
  label: item?.owner?.name,
  value: item?.owner?.name,
}));

const accessRightsOptions = [
  {
    label: 'Private to owner',
    value: 'Private to owner',
  },
  {
    label: 'Everyone (View and edit)',
    value: 'Everyone (View and edit)',
  },
  {
    label: 'Everyone (View)',
    value: 'Everyone (View)',
  },
  {
    label: 'Special user',
    value: 'Special user',
  },
];

export const defaultValuesManageDashboard = {
  dashboardName: null,
  owner: null,
  accessRights: null,
};

export const filterFieldsManageDashboard = [
  {
    id: 2,
    component: RHFAutocomplete,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'dashboardName',
      label: 'Dashboard Name',
      placeholder: 'Select Dashboard Name',
      options: dashboardNameOptions,
      getOptionLabel: (option: any) => option?.label,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'owner',
      label: 'Owner',
      placeholder: 'Select Owner',
      options: ownerOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'accessRights',
      label: 'Access Rights',
      placeholder: 'Select Access Rights',
      options: accessRightsOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];
