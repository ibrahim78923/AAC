import React from 'react';
import {
  Box,
  useTheme,
  Button,
  Grid,
  MenuItem,
  Menu,
  Tooltip,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModals } from '@/components/AlertModals';

import { columns, jobPostingFiltersFields } from './jobPosting.data';
import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import useJobPosting from './useJobPosting';
import { styles } from './Jobs.styles';
import EditJobPost from './EditJobPost/index';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_SETTINGS_JOB_POSTING_PERMISSIONS } from '@/constants/permission-keys';

const JobPosting = () => {
  const theme = useTheme();
  const {
    anchorEl,
    actionMenuOpen,
    handleActionsClick,
    handleClose,
    jopPostingData,
    loadingJobPosting,
    setSearchValue,
    handleRefresh,
    openJobPostingFilter,
    handleOpenJobPostingFilters,
    handleCloseJobPostingFilters,
    handleFiltersSubmit,
    methodsFilter,
    openModalDeleteJobPost,
    handleOpenModalDeleteJobPost,
    handleCloseModalDeleteJobPost,
    handleDeleteJobPost,
    loadingDeleteJobPost,
    openEditJobPost,
    handleOpenEditJobPost,
    handleCloseEditJobPost,
    handleSubmitEditJobPost,
    loadingUpdateJobPost,
    methodsEditJobPosting,
    setPageLimit,
    setPage,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
    isFieldsDisabled,
    drawerTitle,
  } = useJobPosting();

  const getColumns = columns(
    theme,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  return (
    <Box>
      <PermissionsGuard
        permissions={[SUPER_ADMIN_SETTINGS_JOB_POSTING_PERMISSIONS?.Job_List]}
      >
        <Box sx={styles?.filterBar}>
          <Box sx={styles?.search}>
            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_JOB_POSTING_PERMISSIONS?.Search_and_Filter,
              ]}
            >
              <Search
                setSearchBy={setSearchValue}
                label="Search Here"
                size="small"
                width={'100%'}
              />
            </PermissionsGuard>
          </Box>
          <Box sx={styles?.filterButtons}>
            <Button
              id="basic-button"
              aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={actionMenuOpen ? 'true' : undefined}
              onClick={handleActionsClick}
              sx={styles?.actionBtn}
              className="small"
              disabled={isActionsDisabled}
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
              PaperProps={{
                style: {
                  width: '112px',
                },
              }}
            >
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_JOB_POSTING_PERMISSIONS?.Edit_Job,
                ]}
              >
                <MenuItem
                  style={{ fontSize: '14px' }}
                  disabled={!rowId}
                  onClick={() => handleOpenEditJobPost('Update')}
                >
                  Edit
                </MenuItem>
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_JOB_POSTING_PERMISSIONS?.View_Job,
                ]}
              >
                <MenuItem
                  style={{ fontSize: '14px' }}
                  disabled={!rowId}
                  onClick={() => handleOpenEditJobPost('View')}
                >
                  View
                </MenuItem>
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_JOB_POSTING_PERMISSIONS?.Delete_Job,
                ]}
              >
                <MenuItem
                  style={{ fontSize: '14px' }}
                  onClick={handleOpenModalDeleteJobPost}
                >
                  Delete
                </MenuItem>
              </PermissionsGuard>
            </Menu>
            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_JOB_POSTING_PERMISSIONS?.Refresh_Record,
              ]}
            >
              <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
                <Button
                  sx={styles?.refreshButton(theme)}
                  className="small"
                  onClick={handleRefresh}
                >
                  <RefreshSharedIcon />
                </Button>
              </Tooltip>
            </PermissionsGuard>

            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_JOB_POSTING_PERMISSIONS?.Search_and_Filter,
              ]}
            >
              <Button
                className="small"
                sx={styles?.filterButton(theme)}
                onClick={handleOpenJobPostingFilters}
              >
                <FilterSharedIcon /> &nbsp; Filter
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
        <Box>
          <TanstackTable
            columns={getColumns}
            data={jopPostingData?.data?.jobs}
            isLoading={loadingJobPosting}
            isPagination
            count={jopPostingData?.data?.meta?.pages}
            totalRecords={jopPostingData?.data?.meta?.total}
            onPageChange={handlePageChange}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </Box>
      </PermissionsGuard>
      <CommonDrawer
        isDrawerOpen={openJobPostingFilter}
        onClose={handleCloseJobPostingFilters}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleFiltersSubmit}
        isLoading={loadingJobPosting}
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
        open={openModalDeleteJobPost}
        handleClose={handleCloseModalDeleteJobPost}
        handleSubmitBtn={handleDeleteJobPost}
        loading={loadingDeleteJobPost}
      />

      <EditJobPost
        isModalOpen={openEditJobPost}
        onClose={handleCloseEditJobPost}
        handleSubmit={handleSubmitEditJobPost}
        formMethods={methodsEditJobPosting}
        isLoading={loadingUpdateJobPost}
        isFieldsDisabled={isFieldsDisabled}
        title={drawerTitle}
      />
    </Box>
  );
};

export default JobPosting;
