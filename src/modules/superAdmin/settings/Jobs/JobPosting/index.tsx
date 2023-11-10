import React, { useState } from 'react';
import { Box, useTheme, Button, Grid, MenuItem, Menu } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModals } from '@/components/AlertModals';

import {
  columns,
  jobPostingDataArray,
  jobPostingFiltersFields,
} from './jobPosting.data';

import { JobPostingPropsI } from './JobPostingProps.interface';
import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import useJobPosting from './useJobPosting';
import useJobs from '../useJobs';
import { styles } from './Jobs.styles';

const JobPosting = ({
  isOpenAddJobPost,
  closeAddJobPost,
  openAddJobPost,
}: JobPostingPropsI) => {
  const theme = useTheme();
  const [isjobPostingDeleteModal, setIsJobPostingDeleteModal] =
    useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(anchorEl);
  const {
    jopPostinData,
    searchValue,
    handleSearch,
    handleRefresh,
    openJobPostingFilter,
    handleOpenJobPostingFilters,
    handleCloseJobPostingFilters,
    handleFiltersSubmit,
    methodsFilter,
  } = useJobPosting();
  const { methodsAddJobPosting, handleSubmitAddJobPost, loadingPostAddJob } =
    useJobs();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getColumns = columns(theme);

  return (
    <Box>
      <Box
        mt={2}
        mb={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          padding: '0px 24px',
        }}
      >
        <Search
          label={'Search here'}
          width="100%"
          size="small"
          onChange={handleSearch}
          value={searchValue}
        />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <Button
            id="basic-button"
            aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={actionMenuOpen ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              color: theme.palette.grey[500],
              height: '40px',
              border: '1.5px solid #e7e7e9',
            }}
          >
            Actions &nbsp; <DownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={actionMenuOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={openAddJobPost}>Edit</MenuItem>
            <MenuItem onClick={openAddJobPost}>View</MenuItem>
            <MenuItem onClick={() => setIsJobPostingDeleteModal(true)}>
              Delete
            </MenuItem>
          </Menu>

          <Button sx={styles.refreshButton(theme)} onClick={handleRefresh}>
            <RefreshSharedIcon />
          </Button>
          <Button
            sx={styles.filterButton(theme)}
            onClick={handleOpenJobPostingFilters}
          >
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Box>
      </Box>
      <Box>
        <TanstackTable columns={getColumns} data={jopPostinData?.data?.jobs} />
        <CustomPagination
          count={3}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          entriePages={50}
        />
      </Box>
      <CommonDrawer
        isDrawerOpen={isOpenAddJobPost}
        onClose={closeAddJobPost}
        title="Post a Job"
        okText="Post"
        isOk={true}
        footer={true}
        loading={loadingPostAddJob}
        submitHandler={handleSubmitAddJobPost}
      >
        <>
          <FormProvider methods={methodsAddJobPosting}>
            <Grid container spacing={4}>
              {jobPostingDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
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

      <CommonDrawer
        isDrawerOpen={openJobPostingFilter}
        onClose={handleCloseJobPostingFilters}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleFiltersSubmit}
      >
        <>
          <FormProvider methods={methodsFilter}>
            <Grid container spacing={4}>
              {jobPostingFiltersFields()?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
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

      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isjobPostingDeleteModal}
        handleClose={() => setIsJobPostingDeleteModal(false)}
        handleSubmit={() => setIsJobPostingDeleteModal(false)}
      />
    </Box>
  );
};

export default JobPosting;
