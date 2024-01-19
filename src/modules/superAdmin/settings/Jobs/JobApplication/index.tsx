import React from 'react';
import { Box, useTheme, Button, Grid, Tooltip } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { FormProvider } from '@/components/ReactHookForm';
import { FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import { columns, getFiltersDataArray } from './JobApplication.data';
import { styles } from './JobsApplication.styles';
import { v4 as uuidv4 } from 'uuid';
import useJobApplication from './useJobApplication';

const JobApplication = () => {
  const {
    data,
    isLoading,
    setSearchValue,
    handleRefresh,
    openDrawerFilter,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    setPageLimit,
    setPage,
    handlePageChange,
  } = useJobApplication();
  const theme = useTheme();
  const getColumns = columns(theme);

  return (
    <Box>
      <Box sx={styles?.filterBar}>
        <Box sx={styles?.search}>
          <Search
            setSearchBy={setSearchValue}
            label="Search Here"
            size="small"
            width={'100%'}
          />
        </Box>
        <Box sx={styles?.filterButtons}>
          <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
            <Button
              sx={styles?.refreshButton}
              className="small"
              onClick={handleRefresh}
            >
              <RefreshSharedIcon />
            </Button>
          </Tooltip>
          <Button
            sx={styles?.filterButton}
            className="small"
            onClick={handleOpenFilters}
          >
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Box>
      </Box>
      <Box>
        <TanstackTable
          columns={getColumns}
          data={data?.data?.jobApplications}
          isLoading={isLoading}
          isPagination
          count={data?.data?.meta?.pages}
          totalRecords={data?.data?.meta?.total}
          onPageChange={handlePageChange}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </Box>
      <CommonDrawer
        isDrawerOpen={openDrawerFilter}
        onClose={handleCloseFilters}
        title="Filter"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleFiltersSubmit}
      >
        <>
          <FormProvider methods={methodsFilter}>
            <Grid container spacing={4}>
              {getFiltersDataArray()?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component
                    {...item.componentProps}
                    size={'small'}
                    options={item?.options}
                  >
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </>
      </CommonDrawer>
    </Box>
  );
};

export default JobApplication;
