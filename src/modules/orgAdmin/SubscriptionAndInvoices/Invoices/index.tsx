import { Box, Grid, Button, Menu, MenuItem } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { DropdownIcon, FilterSharedIcon } from '@/assets/icons';
import ViewInvoices from './ViewInvoices';
import PayInvoice from './PayInvoice';
import useInvoices from './useInvoices';
import { styles } from './Invoices.style';
import { FilterInvoiceFiltersDataArray } from './Invoices.data';
import { isNullOrEmpty } from '@/utils';
import { v4 as uuidv4 } from 'uuid';

const Invoices = () => {
  const {
    anchorEl,
    open,
    handleActionsClick,
    handleClose,
    openViewInvoice,
    handleOpenViewInvoice,
    handleCloseViewInvoice,
    openPayInvoice,
    handleOpenPayInvoice,
    handleClosePayInvoice,
    setIsOpenFilter,
    isOpenFilter,
    handleCloseFilter,
    onSubmit,
    FilterInvoiceFilters,
    handleSubmit,
    getRowValues,
    isChecked,
    invoicesTableData,
    setSearchByInvoices,
    searchByInvoices,
  } = useInvoices();

  return (
    <>
      <Box sx={styles?.invoicesTableWrapper}>
        <Box sx={styles?.invoicesHeader}>
          <Grid container>
            <Grid item xs={3}>
              <Box sx={styles?.invoicesHeaderLabel}>Invoices Due</Box>
              <Box sx={styles?.invoicesHeaderValue}>1</Box>
            </Grid>
            <Grid item xs={9}>
              <Box sx={styles?.invoicesHeaderLabel}>Total Balance Due</Box>
              <Box sx={styles?.invoicesHeaderValue}>£ 1,234.11</Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={styles?.tableToolbar}>
          <Box sx={styles?.tableSearch}>
            <Search
              searchBy={searchByInvoices}
              setSearchBy={setSearchByInvoices}
              size="small"
              placeholder="search here"
            />
          </Box>
          <Box sx={styles?.tableToolbarActions}>
            <Box>
              <Button
                size="small"
                onClick={handleActionsClick}
                sx={styles?.actionButton}
                endIcon={<DropdownIcon />}
                disabled={!isChecked}
              >
                Actions
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{
                  '& .MuiList-root': {
                    minWidth: '112px',
                  },
                }}
              >
                <MenuItem onClick={handleOpenPayInvoice}>Pay Now</MenuItem>
                <MenuItem onClick={handleOpenViewInvoice}>View</MenuItem>
              </Menu>

              <Button
                size="small"
                sx={styles?.actionButton}
                style={{ marginLeft: '10px' }}
                onClick={() => setIsOpenFilter(true)}
              >
                <FilterSharedIcon /> Filter
              </Button>
            </Box>
          </Box>
        </Box>

        <TanstackTable columns={getRowValues} data={invoicesTableData} />
      </Box>

      <ViewInvoices open={openViewInvoice} onClose={handleCloseViewInvoice} />
      <PayInvoice open={openPayInvoice} onClose={handleClosePayInvoice} />

      <CommonDrawer
        title="Filters"
        isDrawerOpen={isOpenFilter}
        onClose={handleCloseFilter}
        footer={true}
        okText={'Filters'}
        isOk={true}
        cancelText={'Canel'}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ marginTop: '1.5rem' }}>
          <FormProvider methods={FilterInvoiceFilters}>
            <Grid container spacing={4}>
              {FilterInvoiceFiltersDataArray()?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {!isNullOrEmpty(item?.componentProps?.select)
                      ? item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default Invoices;
