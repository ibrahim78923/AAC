import { Typography } from '@mui/material';
import * as Yup from 'yup';
import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import { PAGINATION } from '@/config';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';

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

export const departmentFormFieldsDynamic: any = ({
  headAPiQuery,
  memberApiQuery,
  auth,
}: any) => [
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
      apiQuery: headAPiQuery,
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        organization: auth?.user?.organization?._id,
        role: ROLES?.ORG_ADMIN,
      },
      getOptionLabel: (option: any) =>
        option?.firstName + ' ' + option?.lastName,
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
      placeholder: 'Select',
      apiQuery: memberApiQuery,
      getOptionLabel: (option: any) =>
        option?.firstName + ' ' + option?.lastName,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 1,
    componentProps: {
      name: 'fileUrl',
      label: 'Image',
      fileName: 'Upload File',
    },
    component: RHFDropZone,
  },
];
