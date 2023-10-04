import React from 'react';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
} from '@mui/material';

import useTanstackTable from './TanstackTable.hook';
import { DownIcon, UpIcon } from '@/assets/icons';
// import { columns, data } from './TanstackTable.mock';
import {
  StyledTableCell,
  StyledTableRow,
  styles,
} from './TanstackTable.styles';
import { flexRender } from '@tanstack/react-table';

const TanstackTable = ({
  columns,
  data,
  rootSX,
  showSerialNo = false,
}: any) => {
  const table = useTanstackTable(data, columns, showSerialNo);
  return (
    <Grid container sx={{ position: 'relative', ...rootSX }}>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => (
                    <StyledTableCell key={header.id}>
                      <Box sx={styles.cell}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}

                        {header?.column?.columnDef?.isSortable && (
                          <Box
                            display={'flex'}
                            flexDirection={'column'}
                            marginLeft={'4px'}
                            gap={'2px'}
                            {...{
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            <UpIcon
                              color={
                                (header.column.getIsSorted() as string) ===
                                'desc'
                                  ? 'black'
                                  : ''
                              }
                            />
                            <DownIcon
                              color={
                                (header.column.getIsSorted() as string) ===
                                'asc'
                                  ? 'black'
                                  : ''
                              }
                            />
                          </Box>
                        )}
                      </Box>
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <StyledTableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <StyledTableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default TanstackTable;
