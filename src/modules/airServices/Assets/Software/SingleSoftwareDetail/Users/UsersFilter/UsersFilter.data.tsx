import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';

export const userDefaultValues = (data: any) => {
  return {
    name: data?.name ?? '',
    department: data?.department ?? null,
    assignedDate: data?.assignedDate ?? '',
    firstSeen: data?.firstSeen ?? 'NONE',
    lastSeen: data?.lastSeen ?? 'NONE',
  };
};

export const userDataArray = (apiQueryDepartment: any) => [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      placeholder: 'Select department',
      apiQuery: apiQueryDepartment,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    componentProps: {
      name: 'assignedDate',
      label: 'Assigned date',
      fullWidth: true,
      select: true,
      options: [
        'NONE',
        'ALL_TIME',
        'TODAY',
        'YESTERDAY',
        'PREVIOUS_WEEK',
        'PREVIOUS_MONTH',
      ],
    },
    component: RHFAutocomplete,

    md: 12,
  },

  {
    componentProps: {
      name: 'firstSeen',
      label: 'First Seen',
      select: true,
      options: [
        'NONE',
        'ALL_TIME',
        'TODAY',
        'YESTERDAY',
        'PREVIOUS_WEEK',
        'PREVIOUS_MONTH',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'lastSeen',
      label: 'Last Seen',
      fullWidth: true,
      select: true,
      options: [
        'NONE',
        'ALL_TIME',
        'TODAY',
        'YESTERDAY',
        'PREVIOUS_WEEK',
        'PREVIOUS_MONTH',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
