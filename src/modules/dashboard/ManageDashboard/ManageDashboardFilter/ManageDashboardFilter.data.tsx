import { RHFSelect } from '@/components/ReactHookForm';
import { dashboardsData } from '../ManageDashboard.data';

// filter options data
const dashboardNameOptions = dashboardsData.map((item: any) => ({
  label: item.dashboardName,
  value: item.dashboardName,
}));

const ownerOptions = dashboardsData.map((item: any) => ({
  label: item.owner.name,
  value: item.owner.name,
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
  dashboardName: '',
  owner: '',
  accessRights: '',
};

export const filterFieldsManageDashboard = [
  {
    id: 2,
    component: RHFSelect,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'dashboardName',
      label: 'Dashboard Name',
      select: true,
      options: dashboardNameOptions,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'owner',
      label: 'Owner',
      select: true,
      options: ownerOptions,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'accessRights',
      label: 'Access Rights',
      select: true,
      options: accessRightsOptions,
    },
    gridLength: 12,
    component: RHFSelect,
  },
];
