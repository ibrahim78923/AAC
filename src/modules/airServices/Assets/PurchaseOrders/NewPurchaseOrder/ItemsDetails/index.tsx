import { Typography } from '@mui/material';
import useItemsDetails from './useItemsDetails';
import {
  itemsDetailsColumnsList,
  upsertPurchaseOrderItemDetailsDynamic,
} from './ItemsDetails.data';
import ItemBilling from './ItemBilling';
import { pxToRem } from '@/utils/getFontValue';
import { FieldArrayTable } from '@/components/Table/FieldArrayTable';
import { useCallback } from 'react';

const ItemsDetails = (props: any) => {
  const { name } = props;
  const { fields, append, vendorId, watch, remove, control } =
    useItemsDetails(props);

  const handleAddItem = () => {
    append({
      itemName: null,
      description: '',
      quantity: null,
      costPerItem: null,
      taxRate: null,
      total: null,
    });
  };

  return (
    <>
      <br />
      <FieldArrayTable
        handleAddItem={handleAddItem}
        columns={itemsDetailsColumnsList}
        fields={fields}
        minWidth={pxToRem(1800)}
        getRowData={useCallback(
          (index: any) =>
            upsertPurchaseOrderItemDetailsDynamic?.(
              index,
              vendorId?._id,
              remove,
              watch,
            ),
          [vendorId?._id, watch, remove],
        )}
      />
      <br />
      <Typography variant="body1" color="error">
        {control?.getFieldState?.(name)?.error?.root?.message}
      </Typography>
      <br />
      <ItemBilling watch={watch} />
    </>
  );
};

export default ItemsDetails;
