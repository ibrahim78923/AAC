import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const upsertValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  description: Yup.string().required('Field is Required'),
  visible: Yup.string().trim().required('Field is Required'),
});

export const upsertDefaultValues = {
  name: '',
  description: '',
  visible: '',
};

export const upsertDataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter Folder Name',
      type: 'text',
      size: 'small',
      fullWidth: true,
      select: false,
      required: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: '#example',
      type: 'text',
      size: 'small',
      fullWidth: true,
      select: false,
      required: false,
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'visible',
      label: 'Visible to',
      type: 'text',
      size: 'small',
      fullWidth: true,
      select: true,
      required: false,
    },
    options: [
      { value: 'All', label: 'All' },
      { value: 'Only to you', label: 'Only to you' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
