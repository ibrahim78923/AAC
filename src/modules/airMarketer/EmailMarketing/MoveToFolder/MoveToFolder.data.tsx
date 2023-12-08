import { RHFSearchableSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaMoveToFolder = Yup?.object()?.shape({
  chooseFolder: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesMoveToFolder = {
  chooseFolder: '',
};

export const dataArrayMoveToFolder = [
  {
    componentProps: {
      name: 'chooseFolder',
      label: 'Name',
      fullWidth: true,
      isCheckBox: true,
      options: [
        { value: 'myPersonalEmails', label: 'My Personal Emails' },
        { value: 'salesTeam', label: 'Sales Team' },
        { value: 'consultantEra', label: 'Consultant Era' },
        { value: 'managementHub', label: 'Management Hub' },
      ],
    },

    component: RHFSearchableSelect,

    md: 12,
  },
];
