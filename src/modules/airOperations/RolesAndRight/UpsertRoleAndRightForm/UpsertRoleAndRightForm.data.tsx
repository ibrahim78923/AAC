import {
  RHFCheckbox,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ROLES_ACTION_CONSTANTS } from '@/constants/strings';
import * as Yup from 'yup';

export const rolesFormValidationSchema = Yup?.object()?.shape({
  rolesId: Yup?.string()?.trim()?.notRequired(),
  rolesName: Yup?.string()?.required('Required'),
  description: Yup?.string()?.nullable(),
  all: Yup?.string()?.trim()?.notRequired(),
  url: Yup?.string()?.trim()?.notRequired(),
  create: Yup?.string()?.trim()?.notRequired(),
  update: Yup?.string()?.trim()?.notRequired(),
  viewReport: Yup?.string()?.trim()?.notRequired(),
  manageReport: Yup?.string()?.trim()?.notRequired(),
  rolesAndRight: Yup?.string()?.trim()?.notRequired(),
  userManagement: Yup?.string()?.trim()?.notRequired(),
});

export const rolesFormDefaultValues = {
  rolesName: '',
  rolesId: '',
  description: '',
  all: '',
  url: '',
  create: '',
  update: '',
  viewReport: '',
  manageReport: '',
  rolesAndRight: '',
  userManagement: '',
};
export const rolesUserDropdown = [
  {
    value: 'option1',
    label: 'Company Owner',
  },
  {
    value: 'option2',
    label: 'Admin',
  },
];
export const upsertRolesData = [
  {
    id: 15747,
    componentProps: {
      name: 'rolesId',
      label: 'Id',
      fullWidth: true,
      disabled: true,
      placeholder: '123',
    },

    component: RHFTextField,
    visible: (actionType: any) => actionType === ROLES_ACTION_CONSTANTS?.EDIT,
    md: 12,
  },
  {
    id: 1,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'rolesName',
      label: 'Role',
      select: true,
      required: true,
    },
    options: rolesUserDropdown,
    visible: () => true,
  },
  {
    id: 2,
    title: 'Description',
    componentProps: {
      name: 'description',
      placeholder: 'Enter Role Description here',
      fullWidth: true,
      style: { height: '20vh' },
    },
    component: RHFEditor,
    md: 12,
    visible: () => true,
  },
];

export const RolesAccordionsTicketsData = {
  Workflow: [
    {
      componentProps: {
        name: 'all',
        label: 'All',
        sx: { mb: 4 },
      },
      component: RHFCheckbox,
      md: 12,
      mb: 2,
    },

    {
      componentProps: {
        name: 'url',
        label: 'Copy URL',
        sx: { mb: 4 },
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'create',
        label: 'Create Dashboard',
        sx: { mb: 4 },
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'update',
        label: 'Update Dashboard',
        sx: { mb: 4 },
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],
  Reports: [
    {
      componentProps: {
        name: 'viewReport',
        label: 'Reports 1',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'manageReport',
        label: 'Reports 2',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],
  'Role and right': [
    {
      componentProps: {
        name: 'rolesAndRight',
        label: 'Role and right',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],

  'User Management': [
    {
      componentProps: {
        name: 'userManagement',
        label: 'User Management',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ],
};
