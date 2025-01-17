import { Typography } from '@mui/material';
import * as Yup from 'yup';
import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { DepartmentHeadListDropdown } from '../DepartmentFormFields/DepartmentHeadListDropdown';
import { MembersListDropdown } from '../DepartmentFormFields/MembersListDropdown';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';

export const departmentFormValidation: any = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    fileUrl: Yup?.mixed()?.nullable(),
    name: Yup?.string()
      ?.trim()
      ?.required('Name is required')
      ?.max(30, 'First Name up to 30 characters'),
    departmentHeadDetails: Yup?.mixed()?.nullable(),
    description: Yup?.string()?.trim(),
    membersListDetails: Yup?.array(),
    ...formSchema,
  });
};

export const departmentFormValues: any = (data: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    name: data?.name ?? '',
    departmentHeadDetails: data?.departmentHeadDetails ?? null,
    description: data?.description ?? '',
    membersListDetails: data?.membersListDetails ?? [],
    fileUrl: null,
    ...initialValues,
  };
};

export const departmentFormFieldsDynamic: any = [
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
    component: DepartmentHeadListDropdown,
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
    component: MembersListDropdown,
  },
  {
    id: 1,
    componentProps: {
      name: 'fileUrl',
      label: 'Image',
      fileName: 'Upload File',
      fileType: `PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`,
      accept: {
        'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
        'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
        'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
      },
    },
    component: RHFDropZone,
  },
];
