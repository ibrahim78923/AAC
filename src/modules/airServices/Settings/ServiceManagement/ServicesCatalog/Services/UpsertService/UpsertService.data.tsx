import {
  RHFAutocomplete,
  RHFDropZone,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
export const upsertServiceValidationSchema = Yup?.object()?.shape({
  itemName: Yup?.string()?.required(),
  cast: Yup?.string(),
  serviceCategories: Yup?.string()?.required(),
  estimatedDelivery: Yup?.string(),
  description: Yup?.string(),
  accessDashboard: Yup?.string(),
  selectAssetsCategories: Yup?.string()?.when('accessDashboard', {
    is: (value: any) => value === 'HardWare/Consumable',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  chooseSoftware: Yup?.string()?.when('accessDashboard', {
    is: (value: any) => value === 'software',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  agentVisibility: Yup?.string()?.when('accessDashboard', {
    is: (value: any) => value === 'software',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  requestedFor: Yup?.string()?.when('accessDashboard', {
    is: (value: any) => value === 'software',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  serviceCategory: Yup?.string()?.when('accessDashboard', {
    is: (value: any) => value === 'software',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  selectAgentVisibility: Yup?.string()?.when('accessDashboard', {
    is: (value: any) => value === 'HardWare/Consumable',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  selectProduct: Yup?.string()?.when('accessDashboard', {
    is: (value: any) => value === 'HardWare/Consumable',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  requesterVisibility: Yup?.string()?.when('accessDashboard', {
    is: (value: any) => value === 'HardWare/Consumable',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
});
export const upsertServiceDefaultValues = {
  published: '',
  cast: '',
  serviceCategories: '',
  estimatedDelivery: '',
  description: '',
  accessDashboard: 'HardWare/Consumable',
  selectAssetsCategories: '',
  chooseSoftware: '',
  agentVisibility: '',
  requestedFor: '',
  serviceCategory: '',
  selectAgentVisibility: '',
  selectProduct: '',
  requesterVisibility: '',
};
export const serviceCategoriesOptions = ['Software Solutions'];
export const softwareCategories = ['Microsoft Office 360', 'Excel'];
export const assetsHardwareCategoriesOptions = [
  'Hardware',
  'Computer',
  'Desktop',
  'Laptop',
];
export const agentVisibilityCategories = ['All Agents', 'Agent Groups'];
export const productHardwareCategories = ['Disk', 'Data Center'];
export const requesterVisibilityCategories = [
  'All Requesters',
  'Requestor Groups',
];
export const upsertServiceData = [
  {
    id: 1,
    componentProps: {
      name: 'itemName',
      label: 'Item Name',
      required: true,
    },

    component: RHFTextField,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      name: 'cast',
      label: 'Cast',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: 'serviceCategories',
      label: 'Service Categories',
      placeholder: 'Software Solutions',
      required: true,
      select: true,
      options: serviceCategoriesOptions,
    },

    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      name: 'estimatedDelivery',
      label: 'Estimated Delivery(HR)',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Description',
      multiline: true,
      minRows: 4,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      name: 'uploadImage',
      label: '',
    },
    component: RHFDropZone,
    md: 6,
  },

  {
    id: 7,
    componentProps: {
      variant: 'body1',
      heading:
        'Select the  assets Type & product or the software to enable agents to seamlessly fulfil hardware,consumable and software services request ',
    },

    gridLength: 12,
    component: Typography,
  },
  {
    id: 8,
    componentProps: {
      name: 'accessDashboard',
      options: [
        {
          label: (
            <>
              {' '}
              <Typography> Hardware/Consumables </Typography>{' '}
              <Typography>For teams to plan and track their tasks </Typography>{' '}
            </>
          ),
          value: 'HardWare/Consumable',
        },
        {
          label: (
            <>
              {' '}
              <Typography> Software </Typography>{' '}
              <Typography>
                For agile team to build,test and ship software{' '}
              </Typography>{' '}
            </>
          ),
          value: 'software',
        },
      ],
      row: true,
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
export const categoriesOfServices = [
  {
    id: 9,
    componentProps: {
      name: 'selectAssetsCategories',
      label: 'Select Assets Categories',
      placeholder: 'Choose',
      required: true,
      select: true,
      options: assetsHardwareCategoriesOptions,
    },
    text: 'HardWare/Consumable',
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 10,
    componentProps: {
      name: 'chooseSoftware',
      label: 'Choose Software',
      placeholder: 'Choose',
      required: true,
      select: true,
      options: softwareCategories,
    },
    text: 'software',
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 11,
    componentProps: {
      name: 'agentVisibility',
      label: 'Agent Visibility',
      placeholder: 'All Agent',
      required: true,
      select: true,
      options: agentVisibilityCategories,
    },
    text: 'software',
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 12,
    componentProps: {
      name: 'requestedFor',
      label: 'Requested For',
      placeholder: 'Select department',
      required: true,
      select: true,
      options: requesterVisibilityCategories,
    },
    text: 'software',
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 13,
    componentProps: {
      name: 'serviceCategory',
      label: 'Service Category',
      placeholder: 'Software Solution',
      required: true,
      select: true,
      options: serviceCategoriesOptions,
    },
    text: 'software',
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 14,
    componentProps: {
      name: 'selectAgentVisibility',
      label: 'Agent Visibility',
      placeholder: 'All Agent',
      required: true,
      select: true,
      options: agentVisibilityCategories,
    },
    text: 'HardWare/Consumable',
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 15,
    componentProps: {
      name: 'selectProduct',
      label: 'Select Product',
      placeholder: 'Choose',
      required: true,
      select: true,
      options: productHardwareCategories,
    },
    text: 'HardWare/Consumable',
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 16,
    componentProps: {
      name: 'requesterVisibility',
      label: 'Requester Visibility',
      placeholder: 'All Requester',
      required: true,
      select: true,
      options: requesterVisibilityCategories,
    },
    text: 'HardWare/Consumable',
    component: RHFAutocomplete,
    md: 6,
  },
];
