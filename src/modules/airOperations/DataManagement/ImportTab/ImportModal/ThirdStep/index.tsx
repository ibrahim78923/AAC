import { Box } from '@mui/material';
import { importTableFields, importTableHeader } from '../ImportModal.data';
import { FieldArrayTable } from '@/components/Table/FieldArrayTable';
import { useCallback } from 'react';
import { pxToRem } from '@/utils/getFontValue';

const ThirdStep = (props: any) => {
  const { control, importLog, fields, remove, filterMandatoryFields } = props;

  return (
    <Box sx={{ my: 2 }}>
      <FieldArrayTable
        columns={importTableHeader}
        fields={fields}
        canAddItem={false}
        minWidth={pxToRem(400)}
        getRowData={useCallback(
          (index: any) =>
            importTableFields?.(
              control,
              'importedFields',
              index,
              importLog,
              remove,
              filterMandatoryFields,
              fields,
            ),
          [importLog, remove, filterMandatoryFields, fields],
        )}
      />
    </Box>
  );
};

export default ThirdStep;
