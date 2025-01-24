import {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Error } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import { ASSET_IMPACT } from '@/constants/strings';
import Search from '@/components/Search';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import GetPurchaseOrderDepartmentDropdown from '../../PurchaseOrderFormFieldsDropdowns/GetPurchaseOrderDepartmentDropdown';
import GetPurchaseOrderLocationDropdown from '../../PurchaseOrderFormFieldsDropdowns/GetPurchaseOrderLocationDropdown';

export const ADDED_INVENTORY_METHODS = {
  ADD_NEW: 'addNew',
  UPDATE_EXISTING: 'updateExisting',
  REVIEWED_AT_ONE_TIME: 10,
};

export const assetsImpactOptions = [
  { _id: ASSET_IMPACT?.LOW, label: ASSET_IMPACT?.LOW },
  { _id: ASSET_IMPACT?.MEDIUM, label: ASSET_IMPACT?.MEDIUM },
  { _id: ASSET_IMPACT?.HIGH, label: ASSET_IMPACT?.HIGH },
];

export const addItemsToInventoryFormDefaultValues = () => {
  return {
    addedItemsCount: 0,
    addInventoryMethod: 'addNew',
    impact: null,
    displayName: '',
    existingInventory: '',
    inventoryData: [],
  };
};

export const addItemsToInventoryFormValidationSchema = (
  purchaseOrderDetails: any,
) => {
  const calculateAddedItemsCount =
    purchaseOrderDetails?.totalReceived -
    (purchaseOrderDetails?.totalItemAdded ?? 0);
  return Yup?.object()?.shape({
    addInventoryMethod: Yup?.string()?.required('Required'),
    addedItemsCount: Yup?.number()?.when('addInventoryMethod', {
      is: (value: any) => value === ADDED_INVENTORY_METHODS?.ADD_NEW,
      then: () =>
        Yup?.number()
          ?.typeError('Not a number')
          ?.positive('Greater than 0')
          ?.max(
            calculateAddedItemsCount,
            !!!calculateAddedItemsCount
              ? `All items are added`
              : `Max value ${calculateAddedItemsCount}`,
          ),
      otherwise: (schema: any) => schema?.notRequired(''),
    }),
    displayName: Yup?.string()
      ?.trim()
      ?.when('addInventoryMethod', {
        is: (value: any) => value === ADDED_INVENTORY_METHODS?.ADD_NEW,
        then: () => Yup?.string()?.trim()?.required('Display name is required'),
        otherwise: (schema: any) => schema?.notRequired(''),
      }),
    impact: Yup?.mixed()
      ?.nullable()
      ?.when('addInventoryMethod', {
        is: (value: any) => value === ADDED_INVENTORY_METHODS?.ADD_NEW,
        then: () => Yup?.mixed()?.nullable()?.required('Impact is required'),
        otherwise: (schema: any) => schema?.notRequired(''),
      }),
    existingInventory: Yup?.string()
      ?.trim()
      ?.when('addInventoryMethod', {
        is: (value: any) => value === ADDED_INVENTORY_METHODS?.UPDATE_EXISTING,
        then: () => Yup?.string()?.trim()?.required('Please select one option'),
        otherwise: (schema: any) => schema?.notRequired(''),
      }),
    inventoryData: Yup?.array()?.of(
      Yup?.object()?.shape({
        itemName: Yup?.string(),
        impact: Yup?.mixed()?.nullable(),
        location: Yup?.mixed()?.nullable(),
        department: Yup?.mixed()?.nullable(),
      }),
    ),
  });
};

export const addItemsToInventoryCountFormFieldsDynamic = (
  inventoryCount: any = '0',
) => {
  return [
    {
      _id: 1,
      heading: 'Items added to inventory',
      componentProps: {
        variant: 'body1',
        color: 'slateBlue.main',
        fontWeight: 600,
      },
      component: Typography,
    },
    {
      _id: 2,
      heading: inventoryCount,
      componentProps: {
        variant: 'body2',
        color: 'slateBlue.main',
      },
      component: Typography,
    },
    {
      _id: 3,
      componentProps: {
        label: 'Add',
        required: true,
        name: 'addedItemsCount',
        fullWidth: true,
      },
      md: 6,
      component: RHFTextField,
    },
    {
      _id: 4,
      heading: (
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          sx={{ cursor: 'pointer' }}
          gap={0.5}
        >
          <Typography>Items To Inventory</Typography>
          <Error color="secondary" />
        </Box>
      ),
      componentProps: {
        variant: 'body2',
        color: 'slateBlue.main',
        component: 'p',
        display: 'flex',
        alignItems: 'flex-end',
        height: '75%',
      },
      md: 6,
      component: Typography,
    },
  ];
};

export const addItemsToInventoryFormFieldsDynamic = (
  watchAddInventoryMethod: any,
  allAssets: any,
  setAssetsSearch: any,
) => {
  return [
    {
      _id: 6,
      component: RHFRadioGroup,
      md: 12,
      componentProps: {
        name: 'addInventoryMethod',
        options: [
          { value: ADDED_INVENTORY_METHODS?.ADD_NEW, label: 'Add New' },
          {
            value: ADDED_INVENTORY_METHODS?.UPDATE_EXISTING,
            label: 'Update Existing',
          },
        ],
      },
    },
    ...(watchAddInventoryMethod === ADDED_INVENTORY_METHODS?.ADD_NEW
      ? [
          {
            _id: 1,
            componentProps: {
              name: 'displayName',
              label: 'Asset Name Prefix',
              fullWidth: true,
              required: true,
            },
            component: RHFTextField,
            md: 12,
          },
          {
            _id: 2,
            componentProps: {
              name: 'impact',
              label: 'Impact',
              fullWidth: true,
              placeholder: 'Choose Impact',
              options: assetsImpactOptions,
              required: true,
              getOptionLabel: (option: any) => option?.label,
            },
            component: RHFAutocomplete,
            md: 12,
          },
          {
            _id: 3,
            component: GetPurchaseOrderDepartmentDropdown,
          },
          {
            _id: 4,
            component: GetPurchaseOrderLocationDropdown,
          },
        ]
      : []),
    ...(watchAddInventoryMethod === ADDED_INVENTORY_METHODS?.UPDATE_EXISTING
      ? [
          {
            _id: 11,
            component: Search,
            componentProps: {
              label: 'Search Here',
              setSearchBy: setAssetsSearch,
              fullWidth: true,
            },
          },
          {
            _id: 10,
            component:
              allAssets?.isFetching || allAssets?.isLoading
                ? SkeletonTable
                : allAssets?.isError
                  ? ApiErrorState
                  : !!!allAssets?.data?.data?.inventories?.length
                    ? NoData
                    : RHFRadioGroup,
            componentProps: {
              ...(!!!allAssets?.data?.data?.inventories?.length ||
              allAssets?.isError
                ? { height: '100%' }
                : {}),
              row: false,
              options: allAssets?.data?.data?.inventories?.map(
                (asset: any) => ({
                  value: asset?._id,
                  label: asset?.displayName,
                }),
              ),
              name: 'existingInventory',
              boxSx: { maxHeight: '30vh', overflow: 'auto' },
              optionSx: {
                border: '1px solid',
                borderColor: 'custom.off_white_three',
                mb: 1,
                borderRadius: 2,
                p: 1,
              },
            },
          },
        ]
      : []),
  ];
};
