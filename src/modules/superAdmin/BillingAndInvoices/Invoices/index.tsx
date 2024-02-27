import { Box, Grid, Button, Menu, MenuItem, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { DropdownIcon, FilterSharedIcon, RefreshIcon } from '@/assets/icons';
import ViewInvoices from './ViewInvoices';
import PayInvoice from './PayInvoice';
import useInvoices from './useInvoices';
import { styles } from './Invoices.style';
import { FilterInvoiceFiltersDataArray } from './Invoices.data';
import { isNullOrEmpty } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import { superAdminBillingInvoicesPath } from '@/routesConstants/paths';
import Link from 'next/link';

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
    handleClosePayInvoice,
    setIsOpenFilter,
    isOpenFilter,
    handleCloseFilter,
    onSubmit,
    FilterInvoiceFilters,
    handleSubmit,
    getRowValues,
    isChecked,
    allInvoicesTableData,
    isGetRowValues,
    handleRefresh,
    searchByClientName,
    setSearchByClientName,
    setPage,
    setPageLimit,
  } = useInvoices();

  return (
    <>
      <Box sx={styles?.invoicesTableWrapper}>
        <Box sx={styles?.invoicesHeader}>
          <Grid container>
            <Grid item xs={3}>
              <Box sx={styles?.invoicesHeaderLabel}>Invoices Due</Box>
              <Box sx={styles?.invoicesHeaderValue}>
                {!allInvoicesTableData?.data?.widget && (
                  <Typography sx={styles?.invoicesHeaderValue}>
                    No Due Invoices{' '}
                  </Typography>
                )}
                {allInvoicesTableData?.data?.widget?.countInvoiceDue}
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box sx={styles?.invoicesHeaderLabel}>Total Balance Due</Box>
              <Box sx={styles?.invoicesHeaderValue}>
                £ {!allInvoicesTableData?.data?.widget && 0}
                {allInvoicesTableData?.data?.widget?.totalAmountDue}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Grid sx={styles?.tableToolbar}>
          <Grid item xs={12} md={6} xl={6} sx={styles?.tableSearch}>
            <Search
              searchBy={searchByClientName}
              setSearchBy={setSearchByClientName}
              label="Search Here"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6} sx={styles?.tableToolbarActions}>
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
                {/* <MenuItem onClick={handleOpenPayInvoice}>Pay Now</MenuItem> */}

                <Link
                  href={{
                    pathname: `${superAdminBillingInvoicesPath?.generate_invoice}`,
                    query: {
                      key: JSON.stringify(isGetRowValues?.row?.original),
                    },
                  }}
                  as={`${superAdminBillingInvoicesPath?.generate_invoice}`}
                >
                  <MenuItem> Edit Invoice</MenuItem>
                </Link>

                <MenuItem onClick={handleOpenViewInvoice}>
                  View Invoice
                </MenuItem>
              </Menu>

              <Button
                sx={{
                  border: '1px solid #D1D5DB',
                  marginLeft: '10px',
                  height: '36px',
                }}
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </Button>

              <Button
                size="small"
                sx={styles?.actionButton}
                style={{ marginLeft: '10px' }}
                onClick={() => setIsOpenFilter(true)}
              >
                <FilterSharedIcon /> Filter
              </Button>
            </Box>
          </Grid>
        </Grid>

        <TanstackTable
          columns={getRowValues}
          data={allInvoicesTableData?.data?.invoices}
          totalRecords={allInvoicesTableData?.data?.meta?.total}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
          count={allInvoicesTableData?.data?.meta?.pages}
          isPagination
        />
        {/* <CustomPagination
          count={3}
          rowsPerPageOptions={[6, 10, 25, 50, 100]}
          entriePages={allInvoicesTableData?.data?.invoices?.length}
        /> */}
      </Box>

      <ViewInvoices
        open={openViewInvoice}
        onClose={handleCloseViewInvoice}
        isGetRowValues={isGetRowValues}
      />
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
              {FilterInvoiceFiltersDataArray()?.map((item: any, index: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={uuidv4()}
                  sx={{
                    paddingTop:
                      index === 0 ? '40px !important' : '17px !important',
                  }}
                >
                  <item.component {...item.componentProps} size={'small'}>
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
