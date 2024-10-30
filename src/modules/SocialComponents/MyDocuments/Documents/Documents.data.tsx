import { RHFRadioGroup, RHFTextField } from '@/components/ReactHookForm';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import * as Yup from 'yup';

export const MODAL_HEADING = {
  create: 'Create Folder',
  update: 'Edit Name',
};

export const VISIBLETO_OPTIONS = {
  PRIVATE: 'PRIVATE',
  USERS: 'USERS',
  TEAMS: 'TEAMS',
  EVERYONE: 'EVERYONE',
};

export const validationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    name: Yup?.string()?.required('Field is Required'),
    visibleTo: Yup?.string()?.required('Field is Required'),
    ...formSchema,
  });
};

export const defaultValuesFolder = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    name: data?.name ?? '',
    visibleTo: data?.visibleTo ?? VISIBLETO_OPTIONS?.EVERYONE,
    ...initialValues,
  };
};

export const createFolderData = () => {
  return [
    {
      componentProps: {
        name: 'name',
        label: 'Folder Name',
        fullWidth: true,
        placeholder: 'Enter name',
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
  ];
};

export const filterData = [
  {
    componentProps: {
      name: 'visibleTo',
      label: 'Filter by',
      fullWidth: true,
      defaultValue: 'EVERYONE',
      options: [
        { value: VISIBLETO_OPTIONS?.PRIVATE, label: 'Me' },
        { value: VISIBLETO_OPTIONS?.TEAMS, label: 'My Teams' },
        { value: VISIBLETO_OPTIONS?.EVERYONE, label: 'Any' },
      ],
      row: false,
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
