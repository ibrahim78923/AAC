import {
  addedInventoryItemsColumns,
  addedInventoryItemsFormFieldsFunction,
} from './AddedInventoryItems.data';
import { ADDED_INVENTORY_METHODS } from '../AddItemsToInventory.data';
import { FieldArrayTable } from '@/components/Table/FieldArrayTable';
import { pxToRem } from '@/utils/getFontValue';
import { useCallback } from 'react';

export const AddedInventoryItems: any = (props: any) => {
  const { fields, getValues, append, name } = props;

  const handleAddItem = () => {
    append(
      Array?.from(
        {
          length:
            +getValues('addedItemsCount') - fields?.length <
            ADDED_INVENTORY_METHODS?.REVIEWED_AT_ONE_TIME
              ? +getValues('addedItemsCount') - fields?.length
              : ADDED_INVENTORY_METHODS?.REVIEWED_AT_ONE_TIME,
        },
        () => ({
          displayName: getValues('displayName'),
          impact: getValues('impact'),
          location: getValues('location'),
          department: getValues('department'),
        }),
      ),
    );
  };

  return (
    <>
      <FieldArrayTable
        canAddItem={fields?.length !== +getValues('addedItemsCount')}
        handleAddItem={handleAddItem}
        columns={addedInventoryItemsColumns}
        fields={fields}
        minWidth={pxToRem(900)}
        getRowData={useCallback(
          (index: any) => addedInventoryItemsFormFieldsFunction?.(name, index),
          [name],
        )}
      />
    </>
  );
};
