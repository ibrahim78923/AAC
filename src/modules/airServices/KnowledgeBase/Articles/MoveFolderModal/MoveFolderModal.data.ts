import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const moveFolderValidationSchema = Yup?.object()?.shape({
  movingFrom: Yup?.string()?.required('Field is Required'),
  moveTo: Yup?.string()?.required('Field is Required'),
});

export const moveFolderDefaultValues = {
  movingFrom: '',
  moveTo: '',
};

const moveToOption = [
  { value: 'Training', label: 'Training' },
  { value: 'Security Firewall', label: 'Security Firewall' },
  { value: 'Hardware', label: 'Hardware' },
  { value: 'Subscriptions', label: 'Subscriptions' },
];

export const moveFolderFields = [
  {
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
    componentProps: {
      name: 'moveTo',
      label: 'Move To',
      fullWidth: true,
      select: true,
    },
    options: moveToOption,
    component: RHFSelect,
    md: 12,
  },
];
