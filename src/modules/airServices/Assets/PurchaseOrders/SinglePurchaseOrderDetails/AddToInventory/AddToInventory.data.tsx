import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

import { ASSET_IMPACT } from '@/constants/strings';

export const assetsImpactOptions = [
  ASSET_IMPACT?.LOW,
  ASSET_IMPACT?.MEDIUM,
  ASSET_IMPACT?.HIGH,
];
export const addInventoryValidationSchemaOne = Yup?.object()?.shape({
  description: Yup?.string()?.required('Field is Required'),
  displayName: Yup?.string()?.required('Field is Required'),
  impact: Yup?.string(),
});
export const addInventoryValidationSchemaUpdate = Yup?.object()?.shape({
  allAssets: Yup?.mixed()?.nullable(),
});
export const addToInventoryItemStatusValidationSchema = Yup?.object()?.shape({
  displayName: Yup?.string()?.required('Field is Required'),
  impact: Yup?.string(),
});
export const addInventoryDefaultValuesFunction = (data?: any) => {
  return {
    test: [
      {
        description: data?.description ?? '',
        displayName: data?.displayName ?? '',
        impact: data?.impact ?? '',
        location: data?.location?._id ?? null,
        department: data?.department?._id ?? null,
      },
    ],
  };
};

const test: any = [
  {
    displayName: '',
    impact: '',
    location: '',
    department: '',
  },
  {
    displayName: '',
    impact: '',
    location: '',
    department: '',
  },
  {
    displayName: '',
    impact: '',
    location: '',
    department: '',
  },
];

export const addToInventoryItemStatusDefaultValuesFunction = (
  newData?: any,
) => {
  return {
    test: !!newData?.purchaseDetail?.test.length
      ? newData?.purchaseDetail?.test
      : test,
  };
};

export const addToInventoryItemAddedFormFieldsDataFunction = (
  apiQueryDepartment: any,
  apiQueryLocations: any,
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
];

export const itemDetailColumns = [
  'itemName',
  'impact',
  'Location',
  'department',
];
export const purchaseDetailFormFieldsFunction = (
  control: any,
  name: any,
  index: any,
  apiQueryLocations: any,
  apiQueryDepartment: any,
) => {
  return [
    {
      id: 1,
      data: (
        <RHFTextField
          name={`${name}.${index}.displayName`}
          control={control}
          size="small"
        />
      ),
    },
    {
      id: 2,
      data: (
        <RHFAutocomplete
          name={`${name}.${index}.impact`}
          size="small"
          options={assetsImpactOptions}
          fullWidth={true}
        />
      ),
    },
    {
      id: 3,
      data: (
        <RHFAutocompleteAsync
          name={`${name}.${index}.location`}
          size="small"
          apiQuery={apiQueryLocations}
          getOptionLabel={(option: any) => option?.locationName}
          fullWidth={true}
        />
      ),
    },

    {
      id: 4,
      data: (
        <RHFAutocompleteAsync
          name={`${name}.${index}.department`}
          size="small"
          apiQuery={apiQueryDepartment}
          fullWidth={true}
        />
      ),
    },
  ];
};
