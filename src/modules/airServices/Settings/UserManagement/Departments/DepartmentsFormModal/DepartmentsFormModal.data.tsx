import { Typography } from '@mui/material';
import * as Yup from 'yup';
import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
  RHFAutocomplete,
} from '@/components/ReactHookForm';

const userOptions = ['Nilson Mandela', 'Enee Well', 'Rachel Chris', 'John Max'];

export const departmentFormValidation: any = Yup?.object()?.shape({
  image: Yup?.mixed(),
  name: Yup?.string(),
  departmentHead: Yup?.string(),
  description: Yup?.string(),
  members: Yup?.array(),
});

export const departmentFormValues: any = {
  image: '',
  name: '',
  departmentHead: '',
  description: '',
  members: [],
};

export const departmentFormFields: any = [
  {
    id: 1,
    componentProps: {
      name: 'image',
      label: 'Image',
    },
    component: RHFDropZone,
  },
  {
    id: 2,
    componentProps: {
      label: 'Name',
      name: 'name',
      fullWidth: true,
      placeholder: 'Enter Name',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      label: 'Department Head',
      name: 'departmentHead',
      fullWidth: true,
      options: userOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      label: 'Description',
      name: 'description',
      fullWidth: true,
    },
    component: RHFEditor,
  },
  {
    id: 5,
    componentProps: {
      variant: 'h4',
    },
    heading: 'Add Members',
    component: Typography,
  },
  {
    id: 6,
    componentProps: {
      label: 'Members',
      name: 'members',
      fullWidth: true,
      multiple: true,
      options: userOptions,
    },
    component: RHFAutocomplete,
  },
];
