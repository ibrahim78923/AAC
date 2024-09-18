import {
  Box,
  Grid,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Skeleton,
} from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import {
  DropdownIcon,
  FilterSharedIcon,
  RefreshSharedIcon,
} from '@/assets/icons';
import ViewInvoices from './ViewInvoices';
import PayInvoice from './PayInvoice';
import useInvoices from './useInvoices';
import { styles } from './Invoices.style';
import { FilterInvoiceFiltersDataArray } from './Invoices.data';
import { isNullOrEmpty } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';
import { indexNumbers } from '@/constants';
import { TICKETS_STATE } from '@/constants/strings';

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
    invoicesTableData,
    setSearchByInvoices,
    searchByInvoices,
    data,
    selectedRows,
    isLoading,
    setPageLimit,
    setPage,
    handleRefresh,
    theme,
  } = useInvoices();

  return (
    <>
      <Box sx={styles?.invoicesTableWrapper}>
        <Box sx={styles?.invoicesHeader}>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box sx={styles?.invoicesHeaderLabel}>Invoices Due</Box>
              <Box sx={styles?.invoicesHeaderValue}>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1rem', width: '100px' }}
                  />
                ) : (
                  data?.data?.widget?.countInvoiceDue
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={9}>
              <Box sx={styles?.invoicesHeaderLabel}>Total Balance Due</Box>
              <Box sx={styles?.invoicesHeaderValue}>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1rem', width: '100px' }}
                  />
                ) : (
                  `£ ${data?.data?.widget?.totalAmountDue}`
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={styles?.tableToolbar}>
          <Box sx={styles?.tableSearch}>
            <PermissionsGuard
              permissions={[
                ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.INVOICES_SEARCH_INVOICE,
              ]}
            >
              <Search
                searchBy={searchByInvoices}
                setSearchBy={setSearchByInvoices}
                size="small"
                placeholder="search here"
              />
            </PermissionsGuard>
          </Box>
          <Box sx={styles?.tableToolbarActions}>
            {/* <Box> */}
            <Button
              size="small"
              onClick={handleActionsClick}
              sx={styles?.actionButton}
              endIcon={<DropdownIcon />}
              disabled={selectedRows?.length === 1 ? false : true}
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
              <PermissionsGuard
                permissions={[
                  ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.INVOICES_PAY_INVOICE,
                ]}
              >
                <MenuItem
                  onClick={handleOpenPayInvoice}
                  disabled={
                    selectedRows[indexNumbers?.ZERO]?.status ===
                    TICKETS_STATE?.PAID
                  }
                >
                  Pay Now
                </MenuItem>
              </PermissionsGuard>

              <PermissionsGuard
                permissions={[
                  ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.INVOICES_VIEW_INVOICE,
                ]}
              >
                <MenuItem onClick={handleOpenViewInvoice}>View</MenuItem>
              </PermissionsGuard>
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
            <PermissionsGuard
              permissions={[
                ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.INVOICES_SEARCH_INVOICE,
              ]}
            >
              <Button
                size="small"
                sx={styles?.actionButton}
                onClick={() => setIsOpenFilter(true)}
              >
                <FilterSharedIcon /> Filter
              </Button>
            </PermissionsGuard>
            {/* </Box> */}
          </Box>
        </Box>
        <TanstackTable
          columns={getRowValues}
          data={invoicesTableData}
          isLoading={isLoading}
          isPagination
          setPage={setPage}
          setPageLimit={setPageLimit}
          count={data?.data?.meta?.pages}
          totalRecords={data?.data?.meta?.total}
          onPageChange={(page: number) => setPage(page)}
          currentPage={data?.data?.meta?.page}
          pageLimit={data?.data?.meta?.limit}
        />
      </Box>

      <ViewInvoices
        open={openViewInvoice}
        onClose={handleCloseViewInvoice}
        invoiceData={selectedRows ? selectedRows[0] : {}}
      />
      <PayInvoice
        open={openPayInvoice}
        onClose={handleClosePayInvoice}
        invoiceId={selectedRows[indexNumbers?.ZERO]?._id}
      />

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
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={uuidv4()}
                  sx={{ paddingTop: '15px !important' }}
                >
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
