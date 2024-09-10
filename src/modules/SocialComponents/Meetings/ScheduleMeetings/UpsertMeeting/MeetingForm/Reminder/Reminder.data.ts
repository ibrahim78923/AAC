import { RHFAutocomplete } from '@/components/ReactHookForm';

export const typeOptions = [
  { value: 'EMAIL', label: 'Email' },
  { value: 'SMS', label: 'SMS' },
];

export const durationOption = [
  { value: 'MINUTES', label: 'Minutes' },
  { value: 'HOURS', label: 'Hours' },
  { value: 'DAYS', label: 'Days' },
  { value: 'WEEKS', label: 'Weeks' },
];

const duration = {
  MINUTES: 'Minutes',
  HOURS: 'Hours',
  DAYS: 'Days',
  WEEKS: 'Weeks',
};

const counterOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const reminderFields = (
  index: number,
  differenceInDays: number,
  differenceInHours: number,
) => [
  {
    id: 1,
    md: 6,
    componentProps: {
      name: `reminder.${index}.type`,
      fullWidth: true,
      required: true,
      label: `Reminder ${index + 1}`,
      size: 'small',
      placeholder: 'Select',
      options: typeOptions,
      getOptionLabel: (option: any) => option?.label,
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
      options: counterOptions,
    },
    component: RHFAutocomplete,
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
      getOptionDisabled: (option: any) => {
        if (differenceInDays < 1) {
          if (differenceInHours < 1) {
            return option?.label !== duration?.MINUTES;
          } else {
            return (
              option?.label !== duration?.MINUTES &&
              option?.label !== duration?.HOURS
            );
          }
        } else if (differenceInDays < 8) {
          return option?.label === duration?.WEEKS;
        }
        return false;
      },
      options: durationOption,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
];
