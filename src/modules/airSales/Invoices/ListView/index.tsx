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
    selectedValue,
    handleClose,
    isDeleteModal,
    setIsDeleteModal,
    searchBy,
    setSearchBy,
    handleIsViewPage,
    handleDeleteModal,
    handleClick,
    InvoiceData,
    isLoading,
    setPage,
    setPageLimit,
    isDrawerOpen,
    setIsDrawerOpen,
    onSubmit,
    handleSubmit,
    methods,
  } = useListView();

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
              searchBy={searchBy}
              setSearchBy={setSearchBy}
              width={240}
            />
          </Grid>
        </PermissionsGuard>

        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="end" gap={1}>
            <Box>
              <Button
                //  disabled={selected.length > 0 ? false : true}
                disabled={true}
                onClick={handleClick}
                variant="outlined"
                color="inherit"
                className="small"
              >
                Actions
                <ArrowDropDown />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={selectedValue}
                open={Boolean(selectedValue)}
                onClose={handleClose}
              >
                <PermissionsGuard
                  permissions={[
                    AIR_SALES_INVOICES_PERMISSIONS?.SALE_VIEW_INVOICE,
                  ]}
                >
                  <MenuItem onClick={handleIsViewPage}>View</MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    AIR_SALES_INVOICES_PERMISSIONS?.SALE_INVOICE_DOWNLOAD,
                  ]}
                >
                  <MenuItem onClick={handleClose}>Download</MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    AIR_SALES_INVOICES_PERMISSIONS?.SALE_DELETE_INVOICE,
                  ]}
                >
                  <MenuItem onClick={handleDeleteModal}>Delete</MenuItem>
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
                onClick={() => setIsDrawerOpen(true)}
              >
                Filter
              </Button>
            </PermissionsGuard>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '15px' }}>
        <TanstackTable
          columns={invoicesTableColumns}
          data={InvoiceData?.data?.quoteinvoices}
          isLoading={isLoading}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isPagination
          currentPage={InvoiceData?.data?.meta?.pages}
          count={InvoiceData?.data?.meta?.pages}
          pageLimit={InvoiceData?.data?.meta?.limit}
          totalRecords={InvoiceData?.data?.meta?.total}
        />
      </Box>
      <AlertModals
        message="You're about to delete all record. Deleted records can't be restored after 90 days."
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmit={() => setIsDeleteModal(false)}
      />
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Filters"
        isOk={true}
        okText="Apply"
        cancelText="Cancel"
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {invoiceFilterFields?.map((item: any) => (
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
