import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import { assetsImpactOptions } from '../AddItemsToInventory.data';

export const addedInventoryItemsColumns = [
  'Item Name',
  'Impact',
  'Location',
  'Department',
];

export const addedInventoryItemsFormFieldsFunction = (
  name: any,
  index: any,
  apiQueryDepartment: any,
  apiQueryLocation: any,
) => [
  {
    id: 1,
    data: <RHFTextField name={`${name}.${index}.displayName`} size="small" />,
  },
  {
    id: 2,
    data: (
      <RHFAutocomplete
        name={`${name}.${index}.impact`}
        size="small"
        options={assetsImpactOptions}
        fullWidth
        sx={{ minWidth: '5rem' }}
        getOptionLabel={(option: any) => option?.label}
      />
    ),
  },
  {
    id: 3,
    data: (
      <RHFAutocompleteAsync
        name={`${name}.${index}.location`}
        size="small"
        apiQuery={apiQueryLocation}
        getOptionLabel={(option: any) => option?.locationName}
        fullWidth
        sx={{ minWidth: '5rem' }}
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
        fullWidth
        sx={{ minWidth: '5rem' }}
      />
    ),
  },
];
