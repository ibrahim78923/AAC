import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import {
  mappedColumnsFormFieldsFunction,
  mappedColumns,
} from './MappedColumns.data';
import { pxToRem } from '@/utils/getFontValue';

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
      <Box boxShadow={1}>
        <TableContainer>
          <Table sx={{ minWidth: pxToRem(700) }}>
            <TableHead>
              <TableRow>
                {mappedColumns?.map((column: any) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fields?.map((item: any, index: any) => {
                return (
                  <TableRow key={item?.id}>
                    {mappedColumnsFormFieldsFunction?.(
                      name,
                      index,
                      remove,
                      crmColumnsOptions,
                      mandatoryColumnsList,
                      fields,
                    )?.map((singleField: any) => (
                      <TableCell key={singleField?.id}>
                        {singleField?.data}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
