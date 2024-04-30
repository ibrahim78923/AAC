import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

const typeOptions = ['Email', 'Chat'];
const durationOption = ['Minutes', 'Hours', 'Days', 'Weeks'];

export const reminderFields = (index: number) => [
  {
    id: 1,
    md: 6,
    componentProps: {
      name: `reminder.${index}.type`,
      fullWidth: true,
      label: `Reminder ${index + 1}`,
      size: 'small',
      placeholder: 'Select',
      options: typeOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    md: 3,
    componentProps: {
      name: `reminder.${index}.counter`,
      fullWidth: true,
      placeholder: 'Counter',
      label: '\u00a0',
      size: 'small',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    md: 3,
    componentProps: {
      name: `reminder.${index}.duration`,
      fullWidth: true,
      label: '\u00a0',
      size: 'small',
      placeholder: 'Select',
      options: durationOption,
    },
    component: RHFAutocomplete,
  },
];
