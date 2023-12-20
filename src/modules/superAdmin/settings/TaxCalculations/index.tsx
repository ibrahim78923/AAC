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
          <Button
            variant="contained"
            sx={{ height: '36px', fontWeight: '500' }}
            onClick={handleOpenAddDrawer}
          >
            <PlusShared /> &nbsp; Add
          </Button>
        </Box>
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
              <MenuItem
                disabled={!rowId}
                onClick={handleOpenDrawerEditTax}
                style={{ fontSize: '14px' }}
              >
                Edit
              </MenuItem>
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
              <MenuItem
                style={{ fontSize: '14px' }}
                onClick={handleOpenModalDelete}
              >
                Delete
              </MenuItem>
            </Menu>
            <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
              <Button
                sx={styles?.refreshButton(theme)}
                className="small"
                onClick={handleRefresh}
              >
                <RefreshSharedIcon />
              </Button>
            </Tooltip>
            <Button
              sx={styles?.filterButton(theme)}
              className="small"
              onClick={handleOpenFilters}
            >
              <FilterSharedIcon /> &nbsp; Filter
            </Button>
          </Box>
        </Box>
      </Box>

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
