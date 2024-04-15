import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import {
  mappedColumnsFormFieldsFunction,
  mappedColumns,
} from './MappedColumns.data';

export const MappedColumns: any = (props: any) => {
  const { fields, name } = props;

  return (
    <>
      <Box boxShadow={1}>
        <TableContainer>
          <Table sx={{ minWidth: '500px' }}>
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
                    {mappedColumnsFormFieldsFunction?.(name, index)?.map(
                      (singleField: any) => (
                        <TableCell key={singleField?.id}>
                          {singleField?.data}
                        </TableCell>
                      ),
                    )}
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
