import { RHFRadioGroup } from '@/components/ReactHookForm';
import { MANAGE_ACCESS_VISIBLE } from '@/constants';
import * as Yup from 'yup';

export const validationSchemaEmailAccess = (accessValue: any) => {
  return Yup?.object()?.shape({
    access: Yup?.string()?.trim()?.required('Field is Required'),
    ...(accessValue === MANAGE_ACCESS_VISIBLE?.USERS && {
      users: Yup?.mixed()?.nullable()?.required('Field is Required'),
    }),
    ...(accessValue === MANAGE_ACCESS_VISIBLE?.TEAMS && {
      teams: Yup?.mixed()?.nullable()?.required('Field is Required'),
    }),
  });
};

export const defaultValuesEmailAccess = {
  access: '',
};

export const dataArrayEmailAccess = [
  {
    componentProps: {
      name: 'emailAccess',
      fullWidth: true,
      options: [
        { label: 'Available to everyone', value: 'availableToEveryone' },
        {
          label: 'Select user and team who can edit',
          value: 'selectUserAndTeamWhoCanEdit',
        },
      ],
      row: false,
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
export const manageAccess = {
  manageAccess: 'selectUserAndTeamWhoCanEdit',
};
