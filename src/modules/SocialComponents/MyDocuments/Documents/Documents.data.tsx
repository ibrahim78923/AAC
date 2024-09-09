import {
  RHFAutocompleteAsync,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
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
    userIds: data?.userIds ?? [],
    teamIds: data?.teamIds ?? [],
    ...initialValues,
  };
};

export const createFolderData = (
  watchVisibleTo: any,
  orgUsersData: any,
  orgId: string,
  heading: string,
) => {
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
    ...(heading === MODAL_HEADING?.create
      ? [
          {
            componentProps: {
              name: 'visibleTo',
              label: 'Shared with',
              fullWidth: true,
              defaultValue: 'EVERYONE',
              options: [
                { value: VISIBLETO_OPTIONS?.PRIVATE, label: 'Private' },
                { value: VISIBLETO_OPTIONS?.USERS, label: 'Specific users' },
                { value: VISIBLETO_OPTIONS?.TEAMS, label: 'Specific teams' },
                { value: VISIBLETO_OPTIONS?.EVERYONE, label: 'Everyone' },
              ],
              row: false,
              required: true,
            },
            component: RHFRadioGroup,
            md: 12,
          },
          ...(watchVisibleTo === VISIBLETO_OPTIONS?.USERS
            ? [
                {
                  componentProps: {
                    placeholder: 'Select users',
                    name: 'userIds',
                    label: 'Select Users',
                    apiQuery: orgUsersData,
                    multiple: true,
                    getOptionLabel: (option: any) =>
                      `${option?.firstName} ${option?.lastName}`,
                    externalParams: { id: orgId },
                  },
                  component: RHFAutocompleteAsync,
                  md: 12,
                },
              ]
            : []),
        ]
      : []),
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
