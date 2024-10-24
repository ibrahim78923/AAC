import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { assetsImpactOptions } from '../AddItemsToInventory.data';
import GetDynamicPurchaseOrderDepartmentDropdown from '../../../PurchaseOrderFormFieldsDropdowns/GetDynamicPurchaseOrderDepartmentDropdown';
import GetDynamicPurchaseOrderLocationDropdown from '../../../PurchaseOrderFormFieldsDropdowns/GetDynamicPurchaseOrderLocationDropdown';

export const addedInventoryItemsColumns = [
  'Item Name',
  'Impact',
  'Location',
  'Department',
];

export const addedInventoryItemsFormFieldsFunction = (
  name: any,
  index: any,
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
    data: <GetDynamicPurchaseOrderLocationDropdown name={name} index={index} />,
  },
  {
    id: 4,
    data: (
      <GetDynamicPurchaseOrderDepartmentDropdown name={name} index={index} />
    ),
  },
];
