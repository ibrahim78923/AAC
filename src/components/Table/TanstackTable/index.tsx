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
import { v4 as uuidv4 } from 'uuid';

import useTanstackTable from './useTanstackTable';
import { DownIcon, UpIcon } from '@/assets/icons';
import {
  StyledTableCell,
  StyledTableRow,
  styles,
} from './TanstackTable.styles';
import { flexRender } from '@tanstack/react-table';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import CustomPagination from '@/components/CustomPagination';
import ApiErrorState from '@/components/ApiErrorState';

const TanstackTable = (props: any) => {
  const {
    columns = [],
    data = [],
    rootSX,
    showSerialNo = false,
    isLoading = false,
    isFetching = false,
    isError = false,
    isSuccess = true,
    isPagination,
    count,
    pageLimit,
    rowsPerPageOptions,
    currentPage,
    totalRecords,
    onPageChange,
    setPage,
    setPageLimit,
    paginationPaddingX = 2,
    noDataTableText = 'No data is available',
    noDataTableImage = NoAssociationFoundImage,
  } = props;

  const { table } = useTanstackTable(data, columns, showSerialNo);
  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <>
      <Grid container sx={{ position: 'relative', ...rootSX }}>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                {table?.getHeaderGroups()?.map((headerGroup: any) => (
                  <TableRow key={uuidv4()}>
                    {headerGroup?.headers?.map((header: any) => (
                      <StyledTableCell key={uuidv4()}>
                        <Box sx={styles?.cell}>
                          {header?.isPlaceholder
                            ? null
                            : flexRender(
                                header?.column?.columnDef?.header,
                                header?.getContext(),
                              )}
                          {header?.column?.columnDef?.isSortable && (
                            <Box
                              display={'flex'}
                              flexDirection={'column'}
                              marginLeft={'4px'}
                              gap={'2px'}
                              {...{
                                onClick:
                                  header?.column?.getToggleSortingHandler(),
                              }}
                            >
                              <UpIcon
                                color={
                                  (header?.column?.getIsSorted() as string) ===
                                  'desc'
                                    ? 'black'
                                    : ''
                                }
                              />
                              <DownIcon
                                color={
                                  (header?.column?.getIsSorted() as string) ===
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
                {isSuccess &&
                  !isError &&
                  table
                    ?.getRowModel()
                    ?.rows?.map((row) => (
                      <StyledTableRow key={uuidv4()}>
                        {row
                          ?.getVisibleCells()
                          ?.map((cell) => (
                            <StyledTableCell key={uuidv4()}>
                              {flexRender(
                                cell?.column?.columnDef?.cell,
                                cell?.getContext(),
                              )}
                            </StyledTableCell>
                          ))}
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
            {isError ? (
              <ApiErrorState />
            ) : (
              !!!table?.getRowModel()?.rows?.length &&
              isSuccess && (
                <NoData
                  image={noDataTableImage}
                  message={noDataTableText}
                  height="40vh"
                />
              )
            )}
          </TableContainer>
        </Grid>
      </Grid>
      {isPagination && (
        <Box px={paginationPaddingX}>
          <br />
          <br />
          <CustomPagination
            count={count}
            pageLimit={pageLimit}
            rowsPerPageOptions={rowsPerPageOptions}
            currentPage={currentPage}
            totalRecords={totalRecords}
            onPageChange={(page: any) => onPageChange?.(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </Box>
      )}
    </>
  );
};

export default TanstackTable;
