import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { softwareStatusOptions, softwareTypeOptions } from '../Software.data';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { CHARACTERS_LIMIT } from '@/constants/validation';
import GetSoftwareUserDropdown from '../SoftwareFormFieldsDropdowns/GetSoftwareUserDropdown';

export const upsertSoftwareFormValidationSchema: any = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    name: Yup?.string()
      ?.trim()
      ?.required('Name is required')
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_NAME_MAX_CHARACTERS,
        `Name should be less than ${CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_NAME_MAX_CHARACTERS} characters`,
      ),
    description: Yup?.string()?.max(
      CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_DESCRIPTION_MAX_CHARACTERS,
      `Description should be less than ${CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_DESCRIPTION_MAX_CHARACTERS} characters`,
    ),
    type: Yup?.mixed()?.nullable()?.required('Type is required'),
    status: Yup?.mixed()?.nullable()?.required('Status is required'),
    publisher: Yup?.string()?.max(
      CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_PUBLISHER_MAX_CHARACTERS,
      `Publisher should be less than ${CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_PUBLISHER_MAX_CHARACTERS} characters`,
    ),
    category: Yup?.string()?.max(
      CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_CATEGORY_MAX_CHARACTERS,
      `Category should be less than ${CHARACTERS_LIMIT?.SERVICES_ASSETS_SOFTWARE_CATEGORY_MAX_CHARACTERS} characters`,
    ),
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

export const upsertSoftwareFormFields = () => [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter Name',
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
      placeholder: 'Select Status',
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
      placeholder: 'Select Type',
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
      placeholder: 'Enter Publisher',
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
      placeholder: 'Enter Category',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 7,
    component: GetSoftwareUserDropdown,
    md: 12,
  },
];
