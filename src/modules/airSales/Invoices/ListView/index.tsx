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
import { ArrowDropDown } from '@mui/icons-material';
import FilterDrawer from './FilterDrawer';
import { PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';
import { invoicesTableColumns } from '../Invoices.data';
import useListView from './useListView';
import { AlertModals } from '@/components/AlertModals';
import { AIR_SALES } from '@/routesConstants/paths';
import RefreshIcon from '@/assets/icons/modules/airSales/Tasks/refresh';
import { useGetInvoiceQuery } from '@/services/airSales/invoices';
import { AIR_SALES_INVOICES_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

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
  } = useListView();

  const { data: InvoiceData } = useGetInvoiceQuery({});

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
                // disabled={selected.length > 0 ? false : true}
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
              <FilterDrawer />
            </PermissionsGuard>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '15px' }}>
        <TanstackTable
          columns={invoicesTableColumns}
          data={InvoiceData?.data?.quoteinvoices}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      <AlertModals
        message="You're about to delete all record. Deleted records can't be restored after 90 days."
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmit={() => setIsDeleteModal(false)}
      />
    </>
  );
};

export default ListView;
