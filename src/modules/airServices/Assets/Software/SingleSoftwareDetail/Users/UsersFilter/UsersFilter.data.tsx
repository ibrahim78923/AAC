import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const userValidationSchema = Yup?.object()?.shape({
  userName: Yup?.string(),
  department: Yup?.string(),
  userAssignedDate: Yup?.date(),
  userFirstSeen: Yup?.string(),
  userLastSeen: Yup?.string(),
});

export const userDefaultValues = (data: any) => {
  return {
    userName: data?.userName ?? null,
    department: data?.department ?? null,
    userAssignedDate: data?.department ?? null,
    userFirstSeen: data?.userFirstSeen ?? null,
    userLastSeen: data?.userLastSeen ?? null,
  };
};

export const userDataArray = (apiQueryDepartment: any) => [
  {
    componentProps: {
      name: 'userName',
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
      name: 'userAssignedDate',
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
      name: 'userFirstSeen',
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
      name: 'userLastSeen',
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
