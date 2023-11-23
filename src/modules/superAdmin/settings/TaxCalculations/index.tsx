import React from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  Menu,
  MenuItem,
} from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
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
    isActionsDisabled,
    setIsActionsDisabled,
    tableRowValues,
    setTableRowValues,
    rowId,
    setRowId,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loagingGetTaxCalculation,
    dataGetTaxCalculation,
    handleSearch,
    searchValue,
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
  } = useTaxCalculations();
  const theme = useTheme();
  const getTableColumns = columns(
    setIsActionsDisabled,
    tableRowValues,
    setTableRowValues,
    setRowId,
  );

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
      }}
    >
      <Box sx={{ padding: '16px 24px' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '19px',
          }}
        >
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
        <Box
          mt={2}
          mb={3}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'space-between',
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
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Button
              id="basic-button"
              aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={actionMenuOpen ? 'true' : undefined}
              onClick={handleActionsMenuClick}
              sx={{
                color: theme.palette.grey[500],
                height: '40px',
                border: '1.5px solid #e7e7e9',
                '@media (max-width:581px)': {
                  width: '100%',
                },
              }}
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
            >
              <MenuItem disabled={!rowId} onClick={handleOpenDrawerEditTax}>
                Edit
              </MenuItem>
              <MenuItem
                disabled={!rowId}
                onClick={() => handleUpdateStatus('active')}
              >
                Active
              </MenuItem>
              <MenuItem
                disabled={!rowId}
                onClick={() => handleUpdateStatus('inactive')}
              >
                Inactive
              </MenuItem>
              <MenuItem onClick={handleOpenModalDelete}>Delete</MenuItem>
            </Menu>
            <Button sx={styles.refreshButton(theme)} onClick={handleRefresh}>
              <RefreshSharedIcon />
            </Button>
            <Button sx={styles.filterButton(theme)} onClick={handleOpenFilters}>
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
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
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
            <Grid container spacing={4}>
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
            <Grid container spacing={4}>
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
        loading={loadingUpdateTax}
      >
        <>
          <FormProvider methods={methodsEditTaxForm}>
            <Grid container spacing={4}>
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
