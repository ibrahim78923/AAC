import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material';
import { useMemo, useCallback } from 'react';

export const FieldArrayTable = (props: any) => {
  const {
    columns,
    fields,
    getRowData,
    tableContainerCustomStyles = {},
    stickyHeader = false,
    minWidth = 400,
    canAddItem = true,
    handleAddItem,
  } = props;

  const memoizedColumns = useMemo(() => columns, [columns]);

  const memoizedGetRowData = useCallback(
    (index: any) => getRowData?.(index),
    [getRowData],
  );

  const memoizedRows = useMemo(
    () =>
      fields?.map((item: any, index: any) => ({
        id: item?.id,
        rowData: memoizedGetRowData(index),
      })),
    [fields, memoizedGetRowData],
  );

  return (
    <Box sx={{ boxShadow: 1 }}>
      <TableContainer sx={tableContainerCustomStyles}>
        <Table stickyHeader={stickyHeader} sx={{ minWidth }}>
          <TableHead>
            <TableRow>
              {memoizedColumns?.map((column: any) => (
                <TableCell key={column?._id}>{column?.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {memoizedRows?.map(({ id, rowData }: any) => (
              <TableRow key={id}>
                {rowData?.map((singleField: any) => (
                  <TableCell key={singleField?.id} align={singleField?.align}>
                    {singleField?.data}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {canAddItem && (
        <AddNewItemButton
          name=" Add Additional Items"
          color="secondary"
          variant="text"
          onClick={handleAddItem}
          customStyles={{ marginY: 2, marginLeft: 2 }}
        />
      )}
    </Box>
  );
};
