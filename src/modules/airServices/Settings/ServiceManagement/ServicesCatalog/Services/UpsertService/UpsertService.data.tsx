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
  cost: Yup?.number(),
  serviceCategory: Yup?.string()?.required(),
  estimatedDelivery: Yup?.string(),
  description: Yup?.string(),
  assetType: Yup?.string(),
  selectAssetsCategories: Yup?.string()?.when('assetType', {
    is: (value: any) => value === 'HardWare/Consumable',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  software: Yup?.string()?.when('assetType', {
    is: (value: any) => value === 'software',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  agentVisibilty: Yup?.string()?.when('assetType', {
    is: (value: any) => value === 'software',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  requestedFor: Yup?.string()?.when('assetType', {
    is: (value: any) => value === 'software',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  serviceCategorys: Yup?.string()?.when('assetType', {
    is: (value: any) => value === 'software',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  selectAgentVisibility: Yup?.string()?.when('assetType', {
    is: (value: any) => value === 'HardWare/Consumable',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  product: Yup?.string()?.when('assetType', {
    is: (value: any) => value === 'HardWare/Consumable',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
  requesterVisibilty: Yup?.string()?.when('assetType', {
    is: (value: any) => value === 'HardWare/Consumable',
    then: (schema: any) => schema?.required(),
    otherwise: (schema) => schema,
  }),
});
export const upsertServiceDefaultValues = {
  itemName: '',
  cost: '',
  serviceCategory: '',
  estimatedDelivery: '',
  description: '',
  assetType: 'HardWare/Consumable',
  selectAssetsCategories: '',
  software: '',
  agentVisibilty: '',
  requestedFor: '',
  serviceCategorys: '',
  selectAgentVisibility: '',
  product: '',
  requesterVisibilty: '',
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
export const requesterVisibiltyCategories = [
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
      name: 'cost',
      label: 'Cost',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: 'serviceCategory',
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
      name: 'fileUrl',
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
      name: 'assetType',
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
      name: 'software',
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
      name: 'agentVisibilty',
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
      options: requesterVisibiltyCategories,
    },
    text: 'software',
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 13,
    componentProps: {
      name: 'serviceCategorys',
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
      name: 'product',
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
      name: 'requesterVisibilty',
      label: 'Requester Visibility',
      placeholder: 'All Requester',
      required: true,
      select: true,
      options: requesterVisibiltyCategories,
    },
    text: 'HardWare/Consumable',
    component: RHFAutocomplete,
    md: 6,
  },
];
