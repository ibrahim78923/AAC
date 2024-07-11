import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { softwareStatusOptions, softwareTypeOptions } from '../Software.data';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';

export const upsertSoftwareFormValidationSchema: any = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    name: Yup?.string()?.trim()?.required('Name is required'),
    description: Yup?.string(),
    type: Yup?.mixed()?.nullable()?.required('Type is required'),
    status: Yup?.mixed()?.nullable()?.required('Status is required'),
    publisher: Yup?.string(),
    category: Yup?.string(),
    ...formSchema,
  });
};

export const upsertSoftwareFormDefaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    name: data?.name ?? '',
    description: data?.details?.description ?? '',
    status: data?.status ?? null,
    type: data?.type ?? null,
    publisher: data?.details?.publisher ?? '',
    category: data?.details?.category ?? '',
    managedBy: data?.managedByDetails ?? null,
    ...initialValues,
  };
};

export const upsertSoftwareFormFields = (userQuery: any) => [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter Description',
      fullWidth: true,
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      required: true,
      options: softwareStatusOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      required: true,
      options: softwareTypeOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'managedBy',
      label: 'Managed By',
      fullWidth: true,
      apiQuery: userQuery,
      getOptionLabel: (option: any) =>
        option?.firstName + ' ' + option?.lastName,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
