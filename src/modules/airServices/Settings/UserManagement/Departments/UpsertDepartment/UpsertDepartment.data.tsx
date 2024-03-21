import { Typography } from '@mui/material';
import * as Yup from 'yup';
import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

export const departmentFormValidation: any = Yup?.object()?.shape({
  fileUrl: Yup?.mixed()?.nullable(),
  name: Yup?.string()?.required('Name is required'),
  departmentHeadDetails: Yup?.mixed()?.required('Department head is required'),
  description: Yup?.string(),
  membersListDetails: Yup?.array()?.min(1, 'Member is Required'),
});

export const departmentFormValues: any = (data: any) => {
  return {
    name: data?.name ?? '',
    departmentHeadDetails: data?.departmentHeadDetails ?? null,
    description: data?.description ?? '',
    membersListDetails: data?.membersListDetails ?? [],
    fileUrl: null,
  };
};

export const departmentFormFields: any = (
  userList: any,
  userListMember: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'fileUrl',
      label: 'Image',
      accept: {
        'image/*': ['.png', '.jpg', '.svg'],
      },
      fileName: 'Upload File',
      fileType: 'SVG, PNG or JPG (max 2 MB)',
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
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      label: 'Department Head',
      name: 'departmentHeadDetails',
      placeholder: 'Select',
      fullWidth: true,
      apiQuery: userList,
      getOptionLabel: (option: any) =>
        option?.firstName + ' ' + option?.lastName,
      required: true,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 4,
    componentProps: {
      label: 'Description',
      name: 'description',
      fullWidth: true,
      style: { height: '150px' },
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
      name: 'membersListDetails',
      fullWidth: true,
      multiple: true,
      apiQuery: userListMember,
      getOptionLabel: (option: any) =>
        option?.firstName + ' ' + option?.lastName,
      required: true,
    },
    component: RHFAutocompleteAsync,
  },
];
