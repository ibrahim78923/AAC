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
  name: Yup?.string()?.required('Required'),
  departmentHeadDetails: Yup?.mixed()?.required('Required'),
  description: Yup?.string(),
  membersListDetails: Yup?.array()?.min(1, 'Required'),
});

export const departmentFormValues: any = (data: any) => {
  return {
    departmenProfilePicture: data?.departmenProfilePicture ?? '',
    name: data?.name ?? '',
    departmentHeadDetails: data?.departmentHeadDetails ?? null,
    description: data?.description ?? '',
    membersListDetails: data?.membersListDetails ?? [],
  };
};

export const departmentFormFields: any = (
  userList: any,
  userListMember: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'departmenProfilePicture',
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
