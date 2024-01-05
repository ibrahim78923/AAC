import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  // roleId: Yup?.string()?.required('Field is Required'),
  name: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValues = {
  // roleId: '',
  name: '',
  description: '',
};

export const dataArray = [
  // {
  //   componentProps: {
  //     label: 'Role ID',
  //     name: 'roleId',
  //     placeholder: 'Role ID',
  //     fullWidth: true,
  //     required: true,
  //   },
  //   component: RHFTextField,
  //   md: 12,
  // },
  {
    componentProps: {
      label: 'Role Name',
      name: 'name',
      placeholder: 'Role Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Type',
      fullWidth: true,
      multiline: true,
      rows: 3,
    },
  },
];
