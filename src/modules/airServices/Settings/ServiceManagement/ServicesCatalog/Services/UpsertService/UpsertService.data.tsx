import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AIR_SERVICES } from '@/constants';
import { ROLES } from '@/constants/strings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
export const upsertServiceValidationSchema = Yup?.object()?.shape({
  itemName: Yup?.string()?.required(),
  cost: Yup?.number(),
  serviceCategory: Yup?.mixed()?.nullable()?.required(),
  estimatedDelivery: Yup?.string(),
  description: Yup?.string()?.nullable(),
  assetType: Yup?.string()?.nullable(),
  selectAssetsCategories: Yup?.string()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === 'HardWare/Consumable',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  software: Yup?.string()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === 'software',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  agentVisibilty: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === 'software',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  requestedFor: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === 'software',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  serviceCategorys: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === 'software',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  selectAgentVisibility: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === 'HardWare/Consumable',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  product: Yup?.string()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === 'HardWare/Consumable',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
  requesterVisibilty: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === 'HardWare/Consumable',
      then: (schema: any) => schema?.required(),
      otherwise: (schema) => schema,
    }),
});
export const upsertServiceDefaultValues = {
  itemName: '',
  cost: '',
  serviceCategory: null,
  estimatedDelivery: '',
  description: '',
  assetType: 'HardWare/Consumable',
  selectAssetsCategories: '',
  software: '',
  agentVisibilty: null,
  requestedFor: null,
  serviceCategorys: null,
  selectAgentVisibility: null,
  product: '',
  requesterVisibilty: null,
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
export const upsertServiceData = (apiQueryCategory: any) => [
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
      fullWidth: true,
      apiQuery: apiQueryCategory,
      placeholder: 'Choose Category',
      getOptionLabel: (option: any) => option?.categoryName,
    },
    component: RHFAutocompleteAsync,
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
export const categoriesOfServices = (
  apiQueryAgent: any,
  apiRequestorQuery: any,
  router: any,
  apiQueryCategory: any,
) => [
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
      fullWidth: true,
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
      required: true,
      externalParams: { limit: 50, role: ROLES?.ORG_AGENT },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
    text: 'software',
    md: 6,
  },
  {
    id: 12,
    componentProps: {
      name: 'requestedFor',
      label: 'Requested For',
      fullWidth: true,
      required: true,
      apiQuery: apiRequestorQuery,
      EndIcon: AddCircleIcon,
      externalParams: { limit: 50, role: ROLES?.ORG_REQUESTER },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      endIconClick: () => {
        router?.push(AIR_SERVICES?.REQUESTERS_SETTINGS);
      },
      placeholder: 'Add Requester',
    },
    component: RHFAutocompleteAsync,
    text: 'software',
    md: 6,
  },
  {
    id: 13,
    componentProps: {
      name: 'serviceCategorys',
      label: 'Service Category',
      fullWidth: true,
      apiQuery: apiQueryCategory,
      placeholder: 'Choose Category',
      getOptionLabel: (option: any) => option?.categoryName,
    },
    component: RHFAutocompleteAsync,
    text: 'software',
    md: 6,
  },

  {
    id: 14,
    componentProps: {
      name: 'selectAgentVisibility',
      label: 'Agent Visibility',
      fullWidth: true,
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
      required: true,
      externalParams: { limit: 50, role: 'ORG_AGENT' },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
    text: 'HardWare/Consumable',
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
      fullWidth: true,
      required: true,
      apiQuery: apiRequestorQuery,
      EndIcon: AddCircleIcon,
      externalParams: { limit: 50, role: ROLES?.ORG_REQUESTER },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      endIconClick: () => {
        router?.push(AIR_SERVICES?.REQUESTERS_SETTINGS);
      },
      placeholder: 'Add Requester',
    },
    component: RHFAutocompleteAsync,
    text: 'HardWare/Consumable',
    md: 6,
  },
];
