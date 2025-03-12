import { Typography } from '@mui/material';
import {
  mappedColumnsFormFieldsFunction,
  mappedColumns,
} from './MappedColumns.data';
import { pxToRem } from '@/utils/getFontValue';
import { FieldArrayTable } from '@/components/Table/FieldArrayTable';
import { useCallback } from 'react';

export const MappedColumns: any = (props: any) => {
  const { fields, name, remove, crmColumnsOptions, mandatoryColumnsList } =
    props;

  return (
    <>
      <Typography fontWeight={600} color="custom.main">
        Map columns from your file to the right CRM fields and delete the extra
        columns
      </Typography>
      <br />
      <FieldArrayTable
        columns={mappedColumns}
        fields={fields}
        canAddItem={false}
        minWidth={pxToRem(700)}
        getRowData={useCallback(
          (index: any) =>
            mappedColumnsFormFieldsFunction?.(
              name,
              index,
              remove,
              crmColumnsOptions,
              mandatoryColumnsList,
              fields,
            ),
          [name, remove, crmColumnsOptions, mandatoryColumnsList, fields],
        )}
      />
    </>
  );
};
