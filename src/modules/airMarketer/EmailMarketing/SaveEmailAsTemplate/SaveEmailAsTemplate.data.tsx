import { RHFSearchableSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaSaveEmailAsTemplate = Yup?.object()?.shape({
  chooseTemplate: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesSaveEmailAsTemplate = {
  chooseTemplate: '',
};

export const dataArraySaveEmailAsTemplate = [
  {
    componentProps: {
      name: 'chooseTemplate',
      label: 'Template  ',
      fullWidth: true,
      isCheckBox: true,
      options: [
        { value: 'busniessConsultant', label: 'Busniess Consultant' },
        { value: 'salesTeam', label: 'Sales Team' },
        { value: 'consultantEra', label: 'Consultant Era' },
        { value: 'managementHub', label: 'Management Hub' },
      ],
    },
    component: RHFSearchableSelect,
    md: 12,
  },
];
