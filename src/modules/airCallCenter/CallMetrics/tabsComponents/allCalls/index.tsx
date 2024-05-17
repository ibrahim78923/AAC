import React from 'react';

import { Box, Button } from '@mui/material';

import Search from '@/components/Search';
import { FilterSharedIcon } from '@/assets/icons';

import TanstackTable from '@/components/Table/TanstackTable';
import { allCallsData } from './allCalls.data';
import CallsDetailsDrawer from './callsDetailsDrawer';
import { ExportButton } from '@/components/ExportButton';
import FilterAllCalls from './filterAllCalls';
import { useAllCalls } from './useAllCalls';

const AllCalls = () => {
  const {
    theme,
    searchTerm,
    isCallDetailsDrawerOpen,
    setIsCallDetailsDrawerOpen,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    getColumns,
    handleExcelExport,
    isDrawerOpen,
    setIsDrawerOpen,
    handleCsvExport,
  } = useAllCalls();
  return (
    <Box
      py={2}
      borderRadius={2}
      boxShadow={1}
      border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
    >
      <Box px={2}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={2}
        >
          <Search label="Search Here" setSearchBy={searchTerm} />

          <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
            <ExportButton
              handleExcelExport={() => {
                handleExcelExport?.();
              }}
              handleCsvExport={() => {
                handleCsvExport?.();
              }}
            />

            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FilterSharedIcon />}
              onClick={() => setIsDrawerOpen(true)}
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Box>
      <br />

      <TanstackTable
        columns={getColumns}
        data={allCallsData}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
        // isLoading={isLoading}
        currentPage={page}
        // count={Calls?.meta?.total}
        pageLimit={pageLimit}
        // totalRecords={Calls?.meta?.total}
        // isSuccess={true}
        // onPageChange={(page: any) => setPage(page)}
      />
      <CallsDetailsDrawer
        setIsCallDetailsDrawerOpen={setIsCallDetailsDrawerOpen}
        isCallDetailsDrawerOpen={isCallDetailsDrawerOpen}
      />
      {isDrawerOpen && (
        <FilterAllCalls
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      )}
    </Box>
  );
};

export default AllCalls;
