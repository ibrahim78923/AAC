import { Typography } from '@mui/material';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  itemDetailColumns,
  itemDetailFormFieldsFunction,
} from './ItemDetail.data';
import { FieldArrayTable } from '@/components/Table/FieldArrayTable';
import { useCallback } from 'react';
import { pxToRem } from '@/utils/getFontValue';

export const ItemDetail: any = (props: any) => {
  const { name } = props;
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAddItem = () => {
    append({
      serviceName: '',
      priceModel: null,
      cost: 0,
      count: 0,
      comments: '',
    });
  };

  return (
    <>
      <FieldArrayTable
        handleAddItem={handleAddItem}
        columns={itemDetailColumns}
        fields={fields}
        minWidth={pxToRem(1800)}
        getRowData={useCallback(
          (index: any) => itemDetailFormFieldsFunction?.(name, index, remove),
          [name, remove],
        )}
      />
      <Typography variant="body1" color="error">
        {control?.getFieldState?.(name)?.error?.root?.message}
      </Typography>
    </>
  );
};
