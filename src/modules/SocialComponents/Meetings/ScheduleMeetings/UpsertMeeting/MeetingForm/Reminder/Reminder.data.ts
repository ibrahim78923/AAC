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
  differenceInMinutes: number,
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
        if (differenceInMinutes < 60 && differenceInDays < 1) {
          return (
            option?.label === duration?.HOURS ||
            option?.label === duration?.DAYS ||
            option?.label === duration?.WEEKS
          );
        }

        if (differenceInDays < 1) {
          return (
            option?.label !== duration?.MINUTES &&
            option?.label !== duration?.HOURS
          );
        }

        if (differenceInDays >= 1 && differenceInDays < 7) {
          return option?.label === duration?.WEEKS;
        }

        if (differenceInDays >= 7) {
          return (
            option?.label !== duration?.WEEKS &&
            option?.label !== duration?.DAYS &&
            option?.label !== duration?.HOURS &&
            option?.label !== duration?.MINUTES
          );
        }

        return false;
      },
      options: durationOption,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
];
