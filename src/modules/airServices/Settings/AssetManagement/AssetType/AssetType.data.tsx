import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const AssetTypeFormValidationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Name is required'),
  description: Yup?.string()?.trim(),
});

export const AssetFieldFormDefaultValues: any = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
  };
};

export const AssetFieldFormDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Description',
      multiline: true,
      rows: 3,
    },
    component: RHFTextField,
  },
];
