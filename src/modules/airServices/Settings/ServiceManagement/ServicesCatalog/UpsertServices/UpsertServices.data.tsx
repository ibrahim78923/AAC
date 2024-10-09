import {
  RHFAutocompleteAsync,
  RHFDropZone,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ASSET_TYPE } from '@/constants/strings';
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const upsertServiceValidationSchema: any = Yup?.object()?.shape({
  itemName: Yup?.string()
    ?.trim()
    ?.required('Item Name is required')
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.NAME,
      `Maximum Characters Limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
    ),
  cost: Yup?.number()
    ?.nullable()
    ?.typeError('Not a number')
    ?.positive('Greater than 0'),
  serviceCategory: Yup?.mixed()
    ?.nullable()
    ?.required('Service Category is required'),
  estimatedDelivery: Yup?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.NAME,
      `Maximum Characters Limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
    ),
  description: Yup?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION,
      `Maximum Characters Limit is ${GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION}`,
    ),
  fileUrl: Yup?.mixed()?.nullable(),
  categoryType: Yup?.string()?.nullable(),
  assetType: Yup?.mixed()
    ?.nullable()
    ?.when('categoryType', {
      is: (value: any) => value === ASSET_TYPE?.HARDWARE_CONSUMABLE,
      then: (schema: any) => schema?.required('Asset Category is required'),
      otherwise: (schema) => schema,
    }),
  agentVisibilty: Yup?.mixed()
    ?.nullable()
    ?.required('Agent Visibility is required'),
  product: Yup?.mixed()
    ?.nullable()
    ?.when('categoryType', {
      is: (value: any) => value === ASSET_TYPE?.HARDWARE_CONSUMABLE,
      then: (schema: any) => schema?.required('Product is required'),
      otherwise: (schema) => schema,
    }),
  requesterVisibilty: Yup?.mixed()
    ?.nullable()
    ?.required('Requester is required'),
  software: Yup?.mixed()
    ?.nullable()
    ?.when('categoryType', {
      is: (value: any) => value === ASSET_TYPE?.SOFTWARE,
      then: (schema: any) => schema?.required('Software is Required'),
      otherwise: (schema) => schema,
    }),
});

export const upsertServiceDefaultValues = {
  itemName: '',
  cost: null,
  serviceCategory: null,
  estimatedDelivery: '',
  description: '',
  fileUrl: null,
  categoryType: ASSET_TYPE?.HARDWARE_CONSUMABLE,
  assetType: null,
  agentVisibilty: [],
  product: null,
  requesterVisibilty: [],
  software: null,
};

export const getUpsertServiceData = (
  apiServiceCategoryQuery: any,
  categoryTypeWatch: any,
  apiAssetCategoryQuery: any,
  apiSoftwareQuery: any,
  apiProductQuery: any,
  productId: any,
  apiRequesterAndAgentQuery: any,
) => [
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
      required: true,
      placeholder: 'Choose Category',
      apiQuery: apiServiceCategoryQuery,
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
      placeholder: 'Description',
      multiline: true,
      rows: 5.4,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      name: 'fileUrl',
      label: 'Upload Image',
      fileType: 'Drag and drop or click to upload',
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
      variant: 'body2',
      color: 'custom.cadet_color',
    },
    heading:
      'Select the  assets Type & product or the software to enable agents to seamlessly fulfil hardware,consumable and software services request ',
    component: Typography,
  },
  {
    id: 8,
    componentProps: {
      name: 'categoryType',
      options: [
        {
          label: (
            <>
              <Typography variant={'body1'} color={'slateBlue.main'}>
                Hardware/Consumables
              </Typography>
              <Typography variant={'body3'} color={'custom.main'}>
                For teams to plan and track their tasks
              </Typography>
            </>
          ),
          value: ASSET_TYPE?.HARDWARE_CONSUMABLE,
        },
        {
          label: (
            <>
              <Typography variant={'body1'} color={'slateBlue.main'}>
                Software
              </Typography>
              <Typography variant={'body3'} color={'custom.main'}>
                For agile team to build,test and ship software
              </Typography>
            </>
          ),
          value: ASSET_TYPE?.SOFTWARE,
        },
      ],
    },
    component: RHFRadioGroup,
  },
  ...(categoryTypeWatch === ASSET_TYPE?.HARDWARE_CONSUMABLE
    ? [
        {
          id: 9,
          componentProps: {
            name: 'assetType',
            label: 'Select Assets Categories',
            required: true,
            placeholder: 'Choose Assets',
            apiQuery: apiAssetCategoryQuery,
            externalParams: { limit: 50, meta: true },
          },
          component: RHFAutocompleteAsync,
          md: 6,
        },
        {
          id: 11,
          componentProps: {
            name: 'product',
            label: 'Select Product',
            required: true,
            placeholder: 'Choose Product',
            apiQuery: apiProductQuery,
            externalParams: { limit: 50 },
          },
          component: RHFAutocompleteAsync,
          md: 6,
        },
      ]
    : [
        {
          id: 12,
          componentProps: {
            name: 'software',
            label: 'Choose Software',
            required: true,
            placeholder: 'Choose Software',
            apiQuery: apiSoftwareQuery,
            externalParams: { limit: 50 },
          },
          component: RHFAutocompleteAsync,
          md: 6,
        },
      ]),
  {
    id: 10,
    componentProps: {
      name: 'agentVisibilty',
      label: 'Agent Visibility',
      required: true,
      placeholder: 'Choose Agents',
      apiQuery: apiRequesterAndAgentQuery,
      multiple: true,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option.lastName}`,
      externalParams: { productId },
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
  {
    id: 13,
    componentProps: {
      name: 'requesterVisibilty',
      label: 'Requester Visibility',
      required: true,
      placeholder: 'Choose Requesters',
      apiQuery: apiRequesterAndAgentQuery,
      multiple: true,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option.lastName}`,
      externalParams: { productId, requester: true, admin: true },
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
];
