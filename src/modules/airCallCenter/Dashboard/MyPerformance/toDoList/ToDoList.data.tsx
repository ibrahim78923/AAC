import { RHFTextField } from '@/components/ReactHookForm';

export const toDoListFormDefaultValues: any = () => ({
  title: '',
  description: '',
});

export const toDoListFormFieldsDynamic: any = [
  {
    id: 13,
    componentProps: {
      name: 'title',
      fullWidth: true,
      placeholder: 'Title',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 123,
    componentProps: {
      name: 'description',
      fullWidth: true,
      placeholder: 'Description',
      multiline: true,
      rows: 3,
      required: true,
    },
    component: RHFTextField,
  },
];
