import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import { TIME_PERIODS } from '@/constants/strings';

export const dropdownOptions = [
  TIME_PERIODS?.NONE,
  TIME_PERIODS?.ALL_TIME,
  TIME_PERIODS?.TODAY,
  TIME_PERIODS?.YESTERDAY,
  TIME_PERIODS?.PREVIOUS_WEEK,
  TIME_PERIODS?.PREVIOUS_MONTH,
];

export const userDefaultValues = (data: any) => {
  return {
    name: data?.name ?? '',
    department: data?.department ?? null,
    assignedDate: data?.assignedDate ?? null,
    firstSeen: data?.firstSeen ?? null,
    lastSeen: data?.lastSeen ?? null,
  };
};

export const userDataArray = (apiQueryDepartment: any) => [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'department',
      label: 'Department',
      apiQuery: apiQueryDepartment,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 3,
    componentProps: {
      name: 'assignedDate',
      label: 'Assigned Date',
      options: dropdownOptions,
    },
    component: RHFAutocomplete,
  },

  {
    id: 4,
    componentProps: {
      name: 'firstSeen',
      label: 'First Seen',
      options: dropdownOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'lastSeen',
      label: 'Last Seen',
      options: dropdownOptions,
    },
    component: RHFAutocomplete,
  },
];
