import React from 'react';

import { Box, Button } from '@mui/material';

import Search from '@/components/Search';
import { ExportBlackIcon, FilterSharedIcon } from '@/assets/icons';

import TanstackTable from '@/components/Table/TanstackTable';
import { allCallsData } from './allCalls.data';
import CallsDetailsDrawer from './callsDetailsDrawer';

import FilterAllCalls from './filterAllCalls';
import { useAllCalls } from './useAllCalls';

import ExportAllCalls from './exportAllCalls';
import CallsNotesDrawer from './callNotesDrawer';
import { AlertModals } from '@/components/AlertModals';

const AllCalls = () => {
  const {
    isCallDetailsDrawerOpen,
    setIsCallDetailsDrawerOpen,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    getColumns,
    setSearchTerm,
    isDrawerOpen,
    setIsDrawerOpen,
    isExportDrawerOpen,
    setIsExportDrawerOpen,
    isViewDrawerOpen,
    setIsViewDrawerOpen,
    openAlertModal,
    handleCloseAlertModal,
    handleCallsDelete,
  } = useAllCalls();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Search label="Search Here" setSearchBy={setSearchTerm} />

        <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ExportBlackIcon />}
            onClick={() => setIsExportDrawerOpen(true)}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterSharedIcon />}
            onClick={() => setIsDrawerOpen(true)}
          >
            Filter
          </Button>
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
      {isExportDrawerOpen && (
        <ExportAllCalls
          isExportDrawerOpen={isExportDrawerOpen}
          setIsExportDrawerOpen={setIsExportDrawerOpen}
        />
      )}
      {isViewDrawerOpen && (
        <CallsNotesDrawer
          isViewDrawerOpen={isViewDrawerOpen}
          setIsViewDrawerOpen={setIsViewDrawerOpen}
        />
      )}
      <AlertModals
        type="delete"
        open={openAlertModal}
        handleClose={handleCloseAlertModal}
        handleSubmitBtn={handleCallsDelete}
        message="Are you sure you want to disable it?"
      />
    </>
  );
};

export default AllCalls;
