import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from '@mui/material';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Box, Grid, SxProps, styled } from '@mui/material';
import { DownIcon, UpIcon } from '@/assets/icons';
import { columns, data } from './Tanstack.mock';

// types
type TTable = {
  columns: any;
  data: any;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isFetching?: boolean;
  isPagination?: boolean;
  totalPages?: number;
  maxHeight?: number;
  minHeight?: number;
  currentPage?: number;
  onPageChange?: any;
  onSortByChange?: any;
  tableContainerSX?: SxProps;
  showSerialNo?: boolean;
  rootSX?: SxProps;
};

const TanstackTabel = ({
  //   columns,
  //   data,
  //   isFetching = false,
  //   isLoading = false,
  //   isError = false,
  //   isSuccess = false,
  //   totalPages = 1,
  //   currentPage = 1,
  //   onPageChange,
  //   onSortByChange,
  //   isPagination = true,
  //   tableContainerSX = {},
  rootSX = {},
  showSerialNo = false,
}: TTable) => {
  let columnsData = columns;
  if (showSerialNo)
    columnsData = [
      {
        accessorFn: (row: any) => row,
        id: 'srNo',
        cell: (info: any) => Number(info?.row?.id) + 1,
        header: 'Sr. No',
        isSortable: true,
      },
      ...columns,
    ];

  const table = useReactTable({
    data: data ?? [],
    columns: columnsData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Grid container sx={{ position: 'relative', ...rootSX }}>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <StyledTableCell key={header.id}>
                      <Box sx={styles.cell}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {header.column.columnDef.isSortable && (
                          <Box
                            display={'flex'}
                            flexDirection={'column'}
                            marginLeft={'4px'}
                            gap={'2px'}
                          >
                            <UpIcon />
                            <DownIcon />
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

export default TanstackTabel;

// ----------------------------------------------------------------------
// STYLED COMPONENTS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#1D2939',
    fontSize: '14px',
    lineHeight: '18px',
    borderBottom: '1px solid  #EAECF0',
    background: '#F9FAFB',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundImage: 'unset',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    zIndex: '1',
    '&:first-child': {
      borderLeft: '1px solid #EAECF0',
    },
    '&:last-child': {
      borderRight: '1px solid #EAECF0',
    },
  },
  [`&.${tableCellClasses.root}`]: {
    boxShadow: 'unset !important',
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: '12px',
    fontStyle: 'intial',
    color: '#6B7280',
    textTransform: 'capitalize',
    lineHeight: '18px',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    borderBottom: 'none',
    whiteSpace: 'pre-wrap',
    '&:first-child': {
      borderLeft: '1px solid #EAECF0',
    },
    '&:last-child': {
      borderRight: '1px solid #EAECF0',
    },
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  //   '&:nth-of-type(even)': {
  //     background:
  //       theme.palette.mode === 'light'
  //         ? alpha(theme.palette.primary.main, 0.12)
  //         : theme.palette.grey[700],
  //   },
  //   // hide last border
  //   ' &:last-child th': {
  //     background:
  //       theme.palette.mode === 'light'
  //         ? alpha(theme.palette.primary.main, 0.45)
  //         : theme.palette.grey[700],
  //     backdropFilter: 'blur(20px)',
  //     border: 0,
  //     borderRadius: 0,
  //   },
  //   '&:first-of-type': {
  //     boxShadow: 'unset',
  //   },
  borderBottom: '1px solid  #EAECF0',
}));

const styles = {
  cell: {
    display: 'flex',
    alignItems: 'center',
  },
};
