import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const moveFolderValidationSchema = Yup?.object()?.shape({
  movingFrom: Yup?.string()?.required('Required'),
  moveTo: Yup?.mixed()?.nullable()?.required('Required'),
});

export const moveFolderDefaultValues = (data?: any) => {
  return {
    movingFrom: data?.folder?.name ?? '',
    moveTo: null,
  };
};

const moveToOption = [
  { _id: 'Training', label: 'Training' },
  { _id: 'Security Firewall', label: 'Security Firewall' },
  { _id: 'Hardware', label: 'Hardware' },
  { _id: 'Subscriptions', label: 'Subscriptions' },
];

export const moveFolderFields = [
  {
    id: 1,
    componentProps: {
      name: 'movingFrom',
      label: 'Moving From',
      fullWidth: true,
      placeholder: 'Training',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'moveTo',
      label: 'Move To',
      fullWidth: true,
      options: moveToOption,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
