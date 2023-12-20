import { RHFRadioGroup } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaEmailAccess = Yup?.object()?.shape({
  emailAccess: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesEmailAccess = {
  emailAccess: '',
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
