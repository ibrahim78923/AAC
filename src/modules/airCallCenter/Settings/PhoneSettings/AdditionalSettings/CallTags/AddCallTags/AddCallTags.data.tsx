import { RHFTextField } from '@/components/ReactHookForm';
export const addCallTagsFormDefaultValues: any = () => ({
  callTag: '',
});

export const addCallTagsFormFieldsDynamic: any = [
  {
    id: 13,
    componentProps: {
      name: 'callTag',
      label: 'Add Call Tag',
      fullWidth: true,
      placeholder: 'Add Call Tag',
      required: true,
    },
    component: RHFTextField,
  },
];
