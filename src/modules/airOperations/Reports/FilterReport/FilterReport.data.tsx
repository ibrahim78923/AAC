import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { TIME_PERIODS } from '@/constants/strings';

export const dateOptions = [
  {
    _id: TIME_PERIODS?.NONE,
    label: TIME_PERIODS?.NONE,
  },
  {
    _id: TIME_PERIODS?.ALL_TIME,
    label: TIME_PERIODS?.ALL_TIME,
  },
  {
    _id: TIME_PERIODS?.TODAY,
    label: TIME_PERIODS?.TODAY,
  },
  {
    _id: TIME_PERIODS?.YESTERDAY,
    label: TIME_PERIODS?.YESTERDAY,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_WEEK,
    label: TIME_PERIODS?.PREVIOUS_WEEK,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_MONTH,
    label: TIME_PERIODS?.PREVIOUS_MONTH,
  },
];

export const reportFiltersDefaultValues: any = (filterValue: any) => {
  return {
    owner: filterValue?.owner ?? null,
    assigned: filterValue?.assigned ?? null,
    createdDate: filterValue?.createdDate ?? null,
  };
};

export const reportFilterFormFieldsDynamic = (
  reportOwnerApiQuery?: any,
  assigneeApiQuery?: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'owner',
      label: 'Report Owner',
      placeholder: 'Select report owner',
      fullWidth: true,
      apiQuery: reportOwnerApiQuery,
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 2,
    componentProps: {
      name: 'assigned',
      label: 'Assigned',
      placeholder: 'Select Assignee',
      fullWidth: true,
      apiQuery: assigneeApiQuery,
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 3,
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      placeholder: 'Select created date',
      fullWidth: true,
      options: dateOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
];
