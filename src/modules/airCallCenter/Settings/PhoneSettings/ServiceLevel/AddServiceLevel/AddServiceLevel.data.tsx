import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

const QUEUE_OPTIONS = [
  { _id: '1', label: 'Queue 1' },
  { _id: '2', label: 'Queue 2' },
];

export const addServiceLevelFormDefaultValues: any = () => ({
  queueType: null,
  target: '',
  threshold: '',
});

export const addServiceLevelFormFieldsDynamic: any = [
  {
    id: 12,
    componentProps: {
      name: 'queueType',
      label: 'Queue Type',
      fullWidth: true,
      required: true,
      options: QUEUE_OPTIONS,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 13,
    componentProps: {
      name: 'target',
      label: 'Target',
      type: 'number',
      inputProps: { min: 0, max: 100 },
      fullWidth: true,
      placeholder: 'Service Level Target (In %)',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 21,
    componentProps: {
      name: 'threshold',
      label: 'Threshold',
      fullWidth: true,
      inputProps: { min: 0 },
      type: 'number',
      placeholder: 'Time To Answer (In Seconds)',
      required: true,
    },
    component: RHFTextField,
  },
];
