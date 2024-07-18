'use client';
import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModals } from '@/components/AlertModals';
import QueryModal from './QueryModal';
import { enquiriesFiltersFiltersDataArray } from './Enquiries.data';
import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import { styles } from './Enquiries.styles';
import { v4 as uuidv4 } from 'uuid';
import { useEnquiries } from './useEnquiries';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_SETTINGS_ENQUIRIES_PERMISSIONS } from '@/constants/permission-keys';
import { columns } from './Enquiries.data';

const Enquiries = () => {
  const {
    anchorEl,
    isActionMenuOpen,
    handleClick,
    handleClose,
    setSearchValue,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    selectedRowData,
    setSelectedRowData,
    enquiriesData,
    enquiriesIsLoading,
    enquiriesIsFetching,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    isQueryModalOpen,
    handleOpenModalQuery,
    handleCloseModalQuery,
    methodsQueryForm,
    handleQuerySubmit,
    status,
    isEnquiriesDeleteModal,
    handleCloseModalDelete,
    handleOpenModalDelete,
    handleDeleteEnquiries,
  } = useEnquiries();

  const tableColumns = columns(selectedRow, setSelectedRow, setSelectedRowData);

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
      }}
    >
      <PermissionsGuard
        permissions={[
          SUPER_ADMIN_SETTINGS_ENQUIRIES_PERMISSIONS?.Enquiries_List,
        ]}
      >
        <Box sx={styles?.pageHeader}>
          <Box sx={styles?.heading}>
            <Typography variant="h3" sx={{ fontWeight: '600' }}>
              Enquiries
            </Typography>
          </Box>
          <Box sx={styles?.filterBar}>
            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_ENQUIRIES_PERMISSIONS?.Search_and_Filter,
              ]}
            >
              <Box sx={styles?.search}>
                <Search
                  label={'Search here'}
                  setSearchBy={setSearchValue}
                  width="260px"
                  size="small"
                />
              </Box>
            </PermissionsGuard>

            <Box sx={styles?.filterButtons}>
              <Button
                disabled={selectedRow?.length === 0}
                id="basic-button"
                aria-controls={isActionMenuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isActionMenuOpen ? 'true' : undefined}
                onClick={handleClick}
                sx={styles?.actionBtn}
                className="small"
              >
                Actions &nbsp; <DownIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={isActionMenuOpen}
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
                    SUPER_ADMIN_SETTINGS_ENQUIRIES_PERMISSIONS?.Reply_Enquiry,
                  ]}
                >
                  <MenuItem
                    onClick={handleOpenModalQuery}
                    style={{ fontSize: '14px' }}
                  >
                    View & Reply
                  </MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    SUPER_ADMIN_SETTINGS_ENQUIRIES_PERMISSIONS?.Delete_Enquiry,
                  ]}
                >
                  <MenuItem
                    onClick={handleOpenModalDelete}
                    style={{ fontSize: '14px' }}
                  >
                    Delete
                  </MenuItem>
                </PermissionsGuard>
              </Menu>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_ENQUIRIES_PERMISSIONS?.Refresh_Record,
                ]}
              >
                <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
                  <Button
                    sx={styles?.refreshButton}
                    className="small"
                    onClick={handleRefresh}
                  >
                    <RefreshSharedIcon />
                  </Button>
                </Tooltip>
              </PermissionsGuard>

              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_ENQUIRIES_PERMISSIONS?.Search_and_Filter,
                ]}
              >
                <Button
                  sx={styles?.filterButton}
                  className="small"
                  onClick={handleOpenFilters}
                >
                  <FilterSharedIcon /> &nbsp; Filter
                </Button>
              </PermissionsGuard>
            </Box>
          </Box>
        </Box>

        <TanstackTable
          columns={tableColumns}
          data={enquiriesData?.data?.enquiries}
          isLoading={enquiriesIsLoading || enquiriesIsFetching}
          currentPage={enquiriesData?.data?.meta?.page}
          count={enquiriesData?.data?.meta?.pages}
          pageLimit={enquiriesData?.data?.meta?.limit}
          totalRecords={enquiriesData?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </PermissionsGuard>
      <CommonDrawer
        isDrawerOpen={openFilters}
        onClose={handleCloseFilters}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleFiltersSubmit}
        isLoading={enquiriesIsLoading}
      >
        <>
          <FormProvider methods={methodsFilter}>
            <Grid container spacing={4}>
              {enquiriesFiltersFiltersDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
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

      <QueryModal
        isModalOpen={isQueryModalOpen}
        onClose={handleCloseModalQuery}
        methods={methodsQueryForm}
        onSubmit={handleQuerySubmit}
        data={selectedRowData}
        isLoading={status?.isLoading}
      />

      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isEnquiriesDeleteModal}
        handleClose={handleCloseModalDelete}
        handleSubmitBtn={handleDeleteEnquiries}
      />
    </Box>
  );
};

export default Enquiries;
