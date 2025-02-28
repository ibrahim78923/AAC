import {
  RHFDropZone,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { GLOBAL_CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import { GetServicesCategoriesListDropdown } from '../ServicesCatalogFormFields/GetServicesCategoriesListDropdown';
import { GetAssetsCategoriesListDropdown } from '../ServicesCatalogFormFields/GetAssetCategoriesListDropdown';
import { GetProductCatalogListDropdown } from '../ServicesCatalogFormFields/GetProductCatalogListDropdown';
import { GetSoftwareListDropdown } from '../ServicesCatalogFormFields/GetSoftwareListDropdown';
import { GetAgentsListDropdown } from '../ServicesCatalogFormFields/GetAgentsListDropdown';
import { GetRequestersListDropdown } from '../ServicesCatalogFormFields/GetRequestersListDropdown';
import { ASSET_TYPE } from '@/constants/services';

export const upsertServiceValidationSchema: any = Yup?.object()?.shape({
  itemName: Yup?.string()
    ?.trim()
    ?.required('Item name is required')
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
    ?.required('Service category is required'),
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
    )
    ?.test(
      'contains-alphabet',
      'Description must be a string',
      (value) => !value || REGEX?.ALPHABETS?.test(value),
    ),
  fileUrl: Yup?.mixed()?.nullable(),
  categoryType: Yup?.string()?.nullable(),
  assetType: Yup?.mixed()
    ?.nullable()
    ?.when('categoryType', {
      is: (value: any) => value === ASSET_TYPE?.HARDWARE_CONSUMABLE,
      then: (schema: any) => schema?.required('Asset category is required'),
      otherwise: (schema) => schema,
    }),
  agentVisibilty: Yup?.array()?.min(1, 'Agent is required'),
  product: Yup?.mixed()
    ?.nullable()
    ?.when('categoryType', {
      is: (value: any) => value === ASSET_TYPE?.HARDWARE_CONSUMABLE,
      then: (schema: any) => schema?.required('Product is required'),
      otherwise: (schema) => schema,
    }),
  requesterVisibilty: Yup?.array()?.min(1, 'Requester is required'),
  software: Yup?.mixed()
    ?.nullable()
    ?.when('categoryType', {
      is: (value: any) => value === ASSET_TYPE?.SOFTWARE,
      then: (schema: any) => schema?.required('Software is required'),
      otherwise: (schema) => schema,
    }),
});

export const upsertServiceDefaultValues = (data?: any) => {
  return {
    itemName: data?.itemName ?? '',
    cost: data?.cost ?? null,
    serviceCategory: data?.categoryDetails ?? null,
    estimatedDelivery: data?.estimatedDelivery ?? '',
    description: data?.description ?? '',
    fileUrl: null,
    categoryType: !!data?._id
      ? !!data?.assetType
        ? ASSET_TYPE?.HARDWARE_CONSUMABLE
        : ASSET_TYPE?.SOFTWARE
      : ASSET_TYPE?.HARDWARE_CONSUMABLE,
    assetType: data?.assetsTypeDetails ?? null,
    agentVisibilty: data?.agentUserDetails ?? [],
    product: data?.productDetails ?? null,
    requesterVisibilty: data?.requesterUserDetails ?? [],
    software: data?.softwareDetails ?? null,
  };
};

export const getUpsertServiceData = (
  categoryTypeWatch: any,
  serviceId: any,
  attachment: any,
) => {
  return [
    {
      _id: 1,
      componentProps: {
        name: 'itemName',
        label: 'Item Name',
        placeholder: 'Enter item name',
        required: true,
      },
      component: RHFTextField,
      md: 6,
    },
    {
      _id: 2,
      componentProps: {
        name: 'cost',
        label: 'Cost',
        placeholder: 'Enter cost',
      },
      component: RHFTextField,
      md: 6,
    },
    {
      _id: 3,
      component: GetServicesCategoriesListDropdown,
      md: 6,
    },
    {
      _id: 4,
      componentProps: {
        name: 'estimatedDelivery',
        label: 'Estimated Delivery(HR)',
        placeholder: 'Enter Estimated delivery',
      },
      component: RHFTextField,
      md: 6,
    },
    {
      _id: 5,
      componentProps: {
        name: 'description',
        label: 'Description',
        placeholder: 'Write the description',
        multiline: true,
        rows: 5.4,
      },
      component: RHFTextField,
      md: 6,
    },
    {
      _id: 6,
      componentProps: {
        name: 'fileUrl',
        label: 'Upload Image',
        fileName: 'Attach a File',
        isPreviewMode: !!serviceId,
        fileType: 'Drag and drop or click to upload',
        attachmentPreviewDetail: attachment,
        accept: {
          'image/png': ['.png', '.PNG'],
          'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
        },
      },
      component: RHFDropZone,
      md: 6,
    },
    {
      _id: 7,
      componentProps: {
        variant: 'body2',
        color: 'custom.cadet_color',
      },
      heading:
        'Select the  assets Type & product or the software to enable agents to seamlessly fulfil hardware,consumable and software services request ',
      component: Typography,
    },
    {
      _id: 8,
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
            _id: 9,
            component: GetAssetsCategoriesListDropdown,
            md: 6,
          },
          {
            _id: 11,
            component: GetProductCatalogListDropdown,
            md: 6,
          },
        ]
      : [
          {
            _id: 12,
            component: GetSoftwareListDropdown,
            md: 6,
          },
        ]),
    {
      _id: 10,
      component: GetAgentsListDropdown,
      md: 6,
    },
    {
      _id: 13,
      component: GetRequestersListDropdown,
      md: 6,
    },
  ];
};
