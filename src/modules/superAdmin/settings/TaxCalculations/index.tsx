import React from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { FormProvider } from '@/components/ReactHookForm';
import {
  addTaxFormDataArray,
  columns,
  taxFormFiltersDataArray,
} from './TaxCalculations.data';
import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import PlusShared from '@/assets/icons/shared/plus-shared';
import { styles } from './TaxCalculations.styles';
import { v4 as uuidv4 } from 'uuid';
import useTaxCalculations from './useTaxCalculations';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_SETTINGS_TAX_CALCULATIONS_PERMISSIONS } from '@/constants/permission-keys';

const TaxCalculation = () => {
  const {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loagingGetTaxCalculation,
    dataGetTaxCalculation,
    setSearchValue,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    isAddTaxCalculationDrawerOpen,
    handleOpenAddDrawer,
    handleCloseAddDrawer,
    methodsAddTaxForm,
    handleAddTaxSubmit,
    loadingAddTax,
    loadingDelete,
    handleDeleteTaxCalculation,
    isTaxDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleUpdateStatus,
    openDrawerEditTax,
    handleOpenDrawerEditTax,
    handleCloseDrawerEditTax,
    methodsEditTaxForm,
    handleSubmitEditTax,
    loadingUpdateTax,
    setPageLimit,
    setPage,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
  } = useTaxCalculations();
  const theme = useTheme();
  const getTableColumns = columns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: (theme: any) =>
          `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
      }}
    >
      <Box sx={styles?.pageHeader}>
        <Box sx={styles?.heading}>
          <Typography variant="h3" sx={{ fontWeight: '600' }}>
            Tax Calculation
          </Typography>
          <PermissionsGuard
            permissions={[
              SUPER_ADMIN_SETTINGS_TAX_CALCULATIONS_PERMISSIONS?.Add_Tax,
            ]}
          >
            <Button
              variant="contained"
              sx={{ height: '36px', fontWeight: '500' }}
              onClick={handleOpenAddDrawer}
            >
              <PlusShared /> &nbsp; Add
            </Button>
          </PermissionsGuard>
        </Box>
        <Box sx={styles?.filterBar}>
          <PermissionsGuard
            permissions={[
              SUPER_ADMIN_SETTINGS_TAX_CALCULATIONS_PERMISSIONS?.Search_and_Filter,
            ]}
          >
            <Box sx={styles?.search}>
              <Search
                setSearchBy={setSearchValue}
                label="Search Here"
                size="small"
                width={'100%'}
              />
            </Box>
          </PermissionsGuard>

          <Box sx={styles?.filterButtons}>
            <Button
              id="basic-button"
              aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={actionMenuOpen ? 'true' : undefined}
              onClick={handleActionsMenuClick}
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
              onClose={handleActionsMenuClose}
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
                  SUPER_ADMIN_SETTINGS_TAX_CALCULATIONS_PERMISSIONS?.Edit_Tax,
                ]}
              >
                <MenuItem
                  disabled={!rowId}
                  onClick={handleOpenDrawerEditTax}
                  style={{ fontSize: '14px' }}
                >
                  Edit
                </MenuItem>
              </PermissionsGuard>

              <MenuItem
                style={{ fontSize: '14px' }}
                disabled={!rowId}
                onClick={() => handleUpdateStatus('active')}
              >
                Active
              </MenuItem>
              <MenuItem
                style={{ fontSize: '14px' }}
                disabled={!rowId}
                onClick={() => handleUpdateStatus('inactive')}
              >
                Inactive
              </MenuItem>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_TAX_CALCULATIONS_PERMISSIONS?.Delete_Tax,
                ]}
              >
                <MenuItem
                  style={{ fontSize: '14px' }}
                  onClick={handleOpenModalDelete}
                >
                  Delete
                </MenuItem>
              </PermissionsGuard>
            </Menu>
            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_TAX_CALCULATIONS_PERMISSIONS?.Refresh_Record,
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
                SUPER_ADMIN_SETTINGS_TAX_CALCULATIONS_PERMISSIONS?.Search_and_Filter,
              ]}
            >
              <Button
                sx={styles?.filterButton(theme)}
                className="small"
                onClick={handleOpenFilters}
              >
                <FilterSharedIcon /> &nbsp; Filter
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
      </Box>

      <PermissionsGuard
        permissions={[
          SUPER_ADMIN_SETTINGS_TAX_CALCULATIONS_PERMISSIONS?.Tax_List,
        ]}
      >
        <Box>
          <TanstackTable
            columns={getTableColumns}
            data={dataGetTaxCalculation?.data?.taxCalculations}
            isLoading={loagingGetTaxCalculation}
            isPagination
            count={dataGetTaxCalculation?.data?.meta?.pages}
            totalRecords={dataGetTaxCalculation?.data?.meta?.total}
            onPageChange={handlePageChange}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </Box>
      </PermissionsGuard>

      <CommonDrawer
        isDrawerOpen={openFilters}
        onClose={handleCloseFilters}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleFiltersSubmit}
      >
        <>
          <FormProvider methods={methodsFilter}>
            <Grid container spacing={'22px'}>
              {taxFormFiltersDataArray?.map((item: any) => (
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
        isDrawerOpen={isAddTaxCalculationDrawerOpen}
        onClose={handleCloseAddDrawer}
        title="Tax Form"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleAddTaxSubmit}
        isLoading={loadingAddTax}
      >
        <>
          <FormProvider methods={methodsAddTaxForm}>
            <Grid container spacing={'22px'}>
              {addTaxFormDataArray?.map((item: any) => (
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
        isDrawerOpen={openDrawerEditTax}
        onClose={handleCloseDrawerEditTax}
        title="Tax Form"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleSubmitEditTax}
        isLoading={loadingUpdateTax}
      >
        <>
          <FormProvider methods={methodsEditTaxForm}>
            <Grid container spacing={'22px'}>
              {addTaxFormDataArray?.map((item: any) => (
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
        open={isTaxDeleteModal}
        handleClose={handleCloseModalDelete}
        handleSubmitBtn={handleDeleteTaxCalculation}
        loading={loadingDelete}
      />
    </Box>
  );
};

export default TaxCalculation;
