import { RHFAutocomplete } from '@/components/ReactHookForm';

export const propertiesFilterData = [
  {
    componentProps: {
      label: 'Field Type',
      name: 'fieldType',
      placeholder: 'Select Field Type',
      fullWidth: true,
      options: [
        'Single-line text',
        'Multi-line text',
        'Single Checkbox',
        'Mutli checkboxes',
        'Dropdown select',
        'Radio select',
        'Date picker',
        'Number',
        'Calculation',
        'Score',
        'File',
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
