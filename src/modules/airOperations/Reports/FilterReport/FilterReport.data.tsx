import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';
import { MANAGE_REPORTS_ACCESS_TYPES_MAPPED } from '@/constants/api-mapped';
import { MANAGE_ACCESS_TYPES } from '@/constants/strings';
import { FilterReportDataDefaultValuesI } from './FilterReport.interface';
import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';

export const assignedReportsOptions: AutocompleteOptionsI[] = [
  {
    _id: MANAGE_ACCESS_TYPES?.PRIVATE_CAPITAL,
    label:
      MANAGE_REPORTS_ACCESS_TYPES_MAPPED?.[
        MANAGE_ACCESS_TYPES?.PRIVATE_CAPITAL
      ],
  },
  {
    _id: MANAGE_ACCESS_TYPES?.EVERYONE_CAPITAL,
    label:
      MANAGE_REPORTS_ACCESS_TYPES_MAPPED?.[
        MANAGE_ACCESS_TYPES?.EVERYONE_CAPITAL
      ],
  },
  {
    _id: MANAGE_ACCESS_TYPES?.SPECIFIC_USERS,
    label:
      MANAGE_REPORTS_ACCESS_TYPES_MAPPED?.[MANAGE_ACCESS_TYPES?.SPECIFIC_USERS],
  },
];

export const reportFiltersDefaultValues: any = (
  filterValue: FilterReportDataDefaultValuesI,
) => {
  return {
    owner: filterValue?.owner ?? null,
    accessType: filterValue?.accessType ?? null,
    createdDate: {
      startDate: !!filterValue?.startDate
        ? new Date(filterValue?.startDate)
        : null,
      endDate: !!filterValue?.endDate ? new Date(filterValue?.endDate) : null,
      key: 'selection',
    },
  };
};

export const reportFilterFormFieldsDynamic = (reportOwnerApiQuery: any) => [
  {
    id: 1,
    componentProps: {
      name: 'owner',
      label: 'Report Owner',
      placeholder: 'Select report owner',
      fullWidth: true,
      apiQuery: reportOwnerApiQuery,
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 2,
    componentProps: {
      name: 'accessType',
      label: 'Assigned',
      placeholder: 'Select Assignee',
      fullWidth: true,
      options: assignedReportsOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 70,
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      placeholder: 'Select created date',
    },
    component: RHFDateRangePicker,
    md: 12,
  },
];
