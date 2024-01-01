import { Typography } from '@mui/material';
import * as Yup from 'yup';
import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

export const departmentFormValidation: any = Yup?.object()?.shape({
  departmenProfilePicture: Yup?.string(),
  name: Yup?.string(),
  departmentHeadId: Yup?.object(),
  description: Yup?.string(),
  members: Yup?.array(),
});

export const departmentFormValues: any = {
  departmenProfilePicture: '',
  name: '',
  departmentHeadId: null,
  description: '',
  members: [],
};

export const departmentFormFields: any = (usersList: any) => [
  {
    id: 1,
    componentProps: {
      name: 'departmenProfilePicture',
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
      name: 'departmentHeadId',
      placeholder: 'Select',
      fullWidth: true,
      apiQuery: usersList,
    },
    component: RHFAutocompleteAsync,
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
      apiQuery: usersList,
    },
    component: RHFAutocompleteAsync,
  },
];
