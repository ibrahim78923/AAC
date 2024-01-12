import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

import { ASSET_IMPACT } from '@/constants/strings';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { DATE_FORMAT } from '@/constants';
import { AddCircleIcon } from '@/assets/icons';
export const assetsImpactOptions = [
  ASSET_IMPACT?.LOW,
  ASSET_IMPACT?.MEDIUM,
  ASSET_IMPACT?.HIGH,
];
export const addInventoryValidationSchemaOne = Yup?.object()?.shape({
  // description: Yup?.string()?.required('Field is Required'),
  displayName: Yup?.string()?.required('Field is Required'),
  impact: Yup?.string(),
});
export const addInventoryValidationSchemaUpdate = Yup?.object()?.shape({
  allAssets: Yup?.mixed()?.nullable(),
});
export const addToInventoryItemStatusValidationSchema = Yup?.object()?.shape({
  assetName: Yup?.string()?.required('Field is Required'),
  serialNumber: Yup?.string(),
  assetTag: Yup?.string(),
});
export const addInventoryDefaultValuesFunction = (data?: any) => {
  return {
    displayName: data?.displayName ?? '',
    impact: data?.impact ?? '',
    location: data?.location?._id ?? '',
    department: data?.department?._id ?? '',
  };
};

export const addInventoryDefaultValuesOneUpdate = {
  allAssets: '',
};
export const addToInventoryItemStatusDefaultValuesFunction = () => {
  return {
    assetName: '',
    serialNumber: '',
    assetTag: '',
  };
};

export const addToInventoryItemAddedFormFieldsDataFunction = (
  apiQueryDepartment: any,
  apiQueryLocations: any,
  apiQueryAssociateAsset: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'displayName',
      label: 'Asset Name Prefix',
      fullWidth: true,
    },
    toShow: 'Yes',
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: assetsImpactOptions,
    },
    toShow: 'Yes',
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      placeholder: 'Select department',
      apiQuery: apiQueryDepartment,
    },
    toShow: 'Yes',
    component: RHFAutocompleteAsync,
  },
  {
    id: 4,
    componentProps: {
      fullWidth: true,
      name: 'location',
      label: 'Locations',
      placeholder: 'Select location',
      apiQuery: apiQueryLocations,
      getOptionLabel: (option: any) => option?.locationName,
    },
    toShow: 'Yes',
    component: RHFAutocompleteAsync,
  },
  {
    id: 16,
    componentProps: {
      name: 'allAssets',
      label: 'All Assets',
      fullWidth: true,
      multiple: true,
      apiQuery: apiQueryAssociateAsset,
      externalParams: { limit: 50 },
      getOptionLabel: (option: any) => option?.displayName,
      renderOption: (option: any) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Box>
            <Typography variant={'body2'} color={'grey.600'} fontWeight={500}>
              {option?.displayName}
            </Typography>
            <Typography variant={'body4'} color={'grey.900'}>
              {option?.assetType}
            </Typography>
          </Box>
          <Typography variant={'body4'} color={'grey.900'}>
            EOL:
            {dayjs(option?.assetLifeExpiry)?.format(DATE_FORMAT?.UI) ??
              dayjs(new Date())?.format(DATE_FORMAT?.UI)}
          </Typography>
        </Box>
      ),
      placeholder: 'Choose Assets',
      EndIcon: AddCircleIcon,
      endIconSx: { color: 'primary.main' },
    },
    toShow: 'No',
    component: RHFAutocompleteAsync,
  },
];

export const addToInventoryItemStatus = [
  {
    componentProps: {
      name: 'assetName',
      label: 'Asset_Name',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'serialNumber',
      label: 'Serial Number',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'assetTag',
      label: 'Asset Tag',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
];
