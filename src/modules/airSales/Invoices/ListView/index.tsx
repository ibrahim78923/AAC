import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowDropDown, FilterAlt } from '@mui/icons-material';
import { PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { invoiceFilterFields, invoicesTableColumns } from '../Invoices.data';
import useListView from './useListView';
import { AlertModals } from '@/components/AlertModals';
import { AIR_SALES } from '@/routesConstants/paths';
import RefreshIcon from '@/assets/icons/modules/airSales/Tasks/refresh';
import { AIR_SALES_INVOICES_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';

const ListView = () => {
  const navigate = useRouter();
  const {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,

    setSearchBy,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,

    InvoiceData,
    isLoading,
    setPage,
    setPageLimit,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,

    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteInvoice,
    loadingDelete,

    employeeListData,
    handleIsViewPage,
  } = useListView();

  const getTableColumns = invoicesTableColumns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Invoice</Typography>
        <PermissionsGuard
          permissions={[AIR_SALES_INVOICES_PERMISSIONS?.SALE_CREATE_INVOICES]}
        >
          <Button
            variant="contained"
            startIcon={<PlusIcon />}
            onClick={() => navigate?.push(AIR_SALES?.SALES_CREATE_INVOICES)}
            className="small"
          >
            Create Invoice
          </Button>
        </PermissionsGuard>
      </Stack>
      <Grid spacing={2} container sx={{ marginTop: '10px' }}>
        <PermissionsGuard
          permissions={[
            AIR_SALES_INVOICES_PERMISSIONS?.SALE_INVOICE_SEARCH_AND_FILTER,
          ]}
        >
          <Grid item xs={12} md={6}>
            <Search
              label="Search Here"
              size="small"
              setSearchBy={setSearchBy}
              width={240}
            />
          </Grid>
        </PermissionsGuard>

        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="end" gap={1}>
            <Box>
              <Button
                onClick={handleActionsMenuClick}
                variant="outlined"
                color="inherit"
                className="small"
                disabled={isActionsDisabled}
              >
                Actions
                <ArrowDropDown />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={actionMenuOpen}
                onClose={handleActionsMenuClose}
              >
                <PermissionsGuard
                  permissions={[
                    AIR_SALES_INVOICES_PERMISSIONS?.SALE_VIEW_INVOICE,
                  ]}
                >
                  <MenuItem disabled={!rowId} onClick={handleIsViewPage}>
                    View
                  </MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    AIR_SALES_INVOICES_PERMISSIONS?.SALE_INVOICE_DOWNLOAD,
                  ]}
                >
                  <MenuItem onClick={handleActionsMenuClose}>Download</MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    AIR_SALES_INVOICES_PERMISSIONS?.SALE_DELETE_INVOICE,
                  ]}
                >
                  <MenuItem onClick={handleOpenModalDelete}>Delete</MenuItem>
                </PermissionsGuard>
              </Menu>
            </Box>
            <Box
              sx={{
                border: '1px solid #D1D5DB',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px',
                cursor: 'pointer',
              }}
              onClick={handleRefresh}
            >
              <RefreshIcon />
            </Box>
            <PermissionsGuard
              permissions={[
                AIR_SALES_INVOICES_PERMISSIONS?.SALE_INVOICE_SEARCH_AND_FILTER,
              ]}
            >
              {/* <FilterDrawer /> */}
              <Button
                variant="outlined"
                color="inherit"
                className="small"
                startIcon={<FilterAlt />}
                onClick={handleOpenFilters}
              >
                Filter
              </Button>
            </PermissionsGuard>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '15px' }}>
        <TanstackTable
          columns={getTableColumns}
          data={InvoiceData?.data?.quoteinvoices}
          isLoading={isLoading}
          currentPage={InvoiceData?.data?.meta?.page}
          count={InvoiceData?.data?.meta?.pages}
          pageLimit={InvoiceData?.data?.meta?.limit}
          totalRecords={InvoiceData?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </Box>

      <AlertModals
        message="You're about to delete all record. Deleted records can't be restored after 90 days."
        type="delete"
        open={isDeleteModal}
        handleClose={handleCloseModalDelete}
        handleSubmitBtn={handleDeleteInvoice}
        loading={loadingDelete}
      />

      <CommonDrawer
        isDrawerOpen={openFilters}
        onClose={handleCloseFilters}
        title="Filters"
        isOk={true}
        okText="Apply"
        cancelText="Cancel"
        footer={true}
        submitHandler={handleFiltersSubmit}
        isLoading={isLoading}
      >
        <FormProvider methods={methodsFilter}>
          <Grid container spacing={1}>
            {invoiceFilterFields(employeeListData)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};

export default ListView;
