import {
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { FILE_MAX_SIZE } from '@/config';
import { AIR_SERVICES } from '@/constants';
import { ASSET_TYPE, ROLES } from '@/constants/strings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography } from '@mui/material';
import { NextRouter } from 'next/router';
import * as Yup from 'yup';
export const upsertServiceValidationSchema = Yup?.object()?.shape({
  itemName: Yup?.string()
    ?.trim()
    ?.required('Item Name is Required')
    ?.max(30, 'Item Name up to 30 characters'),
  cost: Yup?.number()
    ?.nullable()
    ?.typeError('Not a number')
    ?.positive('Greater than 0'),
  serviceCategory: Yup?.mixed()
    ?.nullable()
    ?.required('Service Category is Required'),
  estimatedDelivery: Yup?.string(),
  description: Yup?.string()?.nullable(),
  assetType: Yup?.string()?.nullable(),
  selectAssetsCategories: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === ASSET_TYPE?.HARDWARE_CONSUMABLE,
      then: (schema: any) => schema?.required('Asset Category is Required'),
      otherwise: (schema) => schema,
    }),
  software: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === ASSET_TYPE?.SOFTWARE,
      then: (schema: any) => schema?.required('Software is Required'),
      otherwise: (schema) => schema,
    }),
  agentVisibilty: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === ASSET_TYPE?.SOFTWARE,
      then: (schema: any) => schema?.required('Agent Visibility is Required'),
      otherwise: (schema) => schema,
    }),
  requestedFor: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === ASSET_TYPE?.SOFTWARE,
      then: (schema: any) => schema?.required('Requested For is Required'),
      otherwise: (schema) => schema,
    }),
  selectAgentVisibility: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === ASSET_TYPE?.HARDWARE_CONSUMABLE,
      then: (schema: any) => schema?.required('Agent Visibility is Required'),
      otherwise: (schema) => schema,
    }),
  product: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === ASSET_TYPE?.HARDWARE_CONSUMABLE,
      then: (schema: any) => schema?.required('Product is Required'),
      otherwise: (schema) => schema,
    }),
  requesterVisibilty: Yup?.mixed()
    ?.nullable()
    ?.when('assetType', {
      is: (value: any) => value === ASSET_TYPE?.HARDWARE_CONSUMABLE,
      then: (schema: any) =>
        schema?.required('Requester Visibility is Required'),
      otherwise: (schema) => schema,
    }),
  fileUrl: Yup?.mixed()?.nullable(),
});

export const upsertServiceDefaultValues = {
  itemName: '',
  cost: null,
  serviceCategory: null,
  estimatedDelivery: '',
  description: '',
  assetType: ASSET_TYPE?.HARDWARE_CONSUMABLE,
  selectAssetsCategories: null,
  software: null,
  agentVisibilty: null,
  requestedFor: null,
  selectAgentVisibility: null,
  product: null,
  requesterVisibilty: null,
  fileUrl: null,
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
export const upsertServiceData = (apiServiceCategoryQuery: any) => [
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
      apiQuery: apiServiceCategoryQuery,
      placeholder: 'Choose Category',
      getOptionLabel: (option: any) => option?.categoryName,
      required: true,
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
      maxRows: 5.5,
      minRows: 5.5,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      name: 'fileUrl',
      fullWidth: true,
      label: '\u00a0\u00a0',
      fileType: `PNG and JPG only (max ${
        FILE_MAX_SIZE?.ATTACH_FILE_MAX_SIZE / (1024 * 1024)
      } MB)`,
      accept: {
        'image/png': ['.png', '.PNG'],
        'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
      },
    },
    component: RHFDropZone,
    md: 6,
  },
  {
    id: 7,
    componentProps: {
      variant: 'body1',
    },
    heading:
      'Select the  assets Type & product or the software to enable agents to seamlessly fulfil hardware,consumable and software services request ',
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
          value: ASSET_TYPE?.HARDWARE_CONSUMABLE,
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
          value: ASSET_TYPE?.SOFTWARE,
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
  router: NextRouter,
  apiServiceCategoryAgentQuery: any,
  apiQueryRequester: any,
  apiQueryAssetType: any,
  apiQuerySoftware: any,
  apiQueryProductCatalog: any,
) => [
  {
    id: 9,
    component: RHFAutocompleteAsync,
    componentProps: {
      fullWidth: true,
      name: 'selectAssetsCategories',
      label: 'Select Assets Categories',
      placeholder: 'All Assets',
      apiQuery: apiQueryAssetType,
      required: true,
      externalParams: { limit: 50, meta: true },
      getOptionLabel: (option: any) => option?.name,
    },
    text: ASSET_TYPE?.HARDWARE_CONSUMABLE,
    md: 6,
  },
  {
    id: 10,
    component: RHFAutocompleteAsync,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: ASSET_TYPE?.SOFTWARE,
      label: 'Choose Software',
      placeholder: 'Choose',
      required: true,
      apiQuery: apiQuerySoftware,
      externalParams: { limit: 50 },
      getOptionLabel: (option: any) => option?.name,
    },
    text: ASSET_TYPE?.SOFTWARE,
  },

  {
    id: 11,
    componentProps: {
      name: 'agentVisibilty',
      label: 'Agent Visibility',
      fullWidth: true,
      apiQuery: apiServiceCategoryAgentQuery,
      placeholder: 'Choose Agent',
      required: true,
      externalParams: { limit: 50, role: ROLES?.ORG_EMPLOYEE },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
    text: ASSET_TYPE?.SOFTWARE,
    md: 6,
  },
  {
    id: 12,
    componentProps: {
      name: 'requestedFor',
      label: 'Requested For',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryRequester,
      EndIcon: AddCircleIcon,
      externalParams: { requester: true, admin: true },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      endIconClick: () => {
        router?.push(AIR_SERVICES?.REQUESTERS_SETTINGS);
      },
      placeholder: 'Add Requester',
    },
    component: RHFAutocompleteAsync,
    text: ASSET_TYPE?.SOFTWARE,
    md: 6,
  },

  {
    id: 13,
    componentProps: {
      name: 'selectAgentVisibility',
      label: 'Agent Visibility',
      fullWidth: true,
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
      required: true,
      externalParams: { limit: 50, role: ROLES?.ORG_EMPLOYEE },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
    text: ASSET_TYPE?.HARDWARE_CONSUMABLE,

    md: 6,
  },
  {
    id: 14,
    componentProps: {
      name: 'product',
      label: 'Select Product',
      placeholder: 'Choose',
      type: 'text',
      size: 'small',
      required: true,
      fullWidth: true,
      apiQuery: apiQueryProductCatalog,
      externalParams: { meta: false, limit: 50, page: 1 },
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
    text: ASSET_TYPE?.HARDWARE_CONSUMABLE,
    md: 6,
  },

  {
    id: 15,
    componentProps: {
      name: 'requesterVisibilty',
      label: 'Requester Visibility',
      fullWidth: true,
      required: true,
      apiQuery: apiRequestorQuery,
      EndIcon: AddCircleIcon,
      externalParams: { requester: true, admin: true },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      endIconClick: () => {
        router?.push(AIR_SERVICES?.REQUESTERS_SETTINGS);
      },
      placeholder: 'Add Requester',
    },
    component: RHFAutocompleteAsync,
    text: ASSET_TYPE?.HARDWARE_CONSUMABLE,
    md: 6,
  },
];
