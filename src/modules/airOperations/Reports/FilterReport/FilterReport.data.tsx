import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDateRangePicker,
} from '@/components/ReactHookForm';
import { MANAGE_REPORTS_ACCESS_TYPES_MAPPED } from '@/constants/api-mapped';
import { MANAGE_ACCESS_TYPES, TIME_PERIODS } from '@/constants/strings';

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

export const assignedReportsOptions = [
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

export const reportFiltersDefaultValues: any = (filterValue: any) => {
  return {
    owner: filterValue?.owner ?? null,
    accessType: filterValue?.accessType ?? null,
    createdDate: {
      startDate: !!filterValue?.startDate
        ? new Date(filterValue?.startDate)
        : null,
      endDate: !!filterValue?.startDate ? new Date(filterValue?.endDate) : null,
      key: 'selection',
    },
  };
};

export const reportFilterFormFieldsDynamic = (
  reportOwnerApiQuery: any,
  productId: string,
) => [
  {
    id: 1,
    componentProps: {
      name: 'owner',
      label: 'Report Owner',
      placeholder: 'Select report owner',
      fullWidth: true,
      apiQuery: reportOwnerApiQuery,
      externalParams: { productId },
      getOptionLabel: (option: any) =>
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
      getOptionLabel: (option: any) => option?.label,
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
