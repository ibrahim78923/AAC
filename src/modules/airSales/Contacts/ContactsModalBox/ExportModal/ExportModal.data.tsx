import { RHFCheckbox } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const customValidationSchema = Yup?.object()?.shape({
  file: Yup?.string()?.required('Field is Required'),
});

export const customDefaultValues = {
  file: '',
};

export const RecordModalData = [
  {
    label: 'File Format',
    componentProps: {
      name: 'file',
      // placeholder: 'Select',
      select: false,
    },
    component: RHFCheckbox,
    md: 4,
  },
  {
    componentProps: {
      name: 'file',
      // placeholder: 'Select',
      select: false,
    },
    component: RHFCheckbox,
    md: 4,
  },
];
