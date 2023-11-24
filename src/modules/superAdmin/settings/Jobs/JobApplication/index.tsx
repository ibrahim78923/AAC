import React from 'react';
import { Box, useTheme, Button, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
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
    searchValue,
    handleSearch,
    handleRefresh,
    openDrawerFilter,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
  } = useJobApplication();
  const theme = useTheme();
  const getColumns = columns(theme);

  return (
    <Box>
      <Box
        mt={2}
        mb={3}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '0px 24px',
        }}
      >
        <Search
          label={'Search here'}
          value={searchValue}
          onChange={handleSearch}
          width="100%"
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Button sx={styles?.refreshButton(theme)} onClick={handleRefresh}>
            <RefreshSharedIcon />
          </Button>
          <Button sx={styles?.filterButton(theme)} onClick={handleOpenFilters}>
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Box>
      </Box>
      <Box>
        <TanstackTable
          columns={getColumns}
          data={data?.data?.jobApplications}
          isLoading={isLoading}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
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
